import * as os from 'os'
import { ToolResult, ToolResultContentBlock, ToolResultStatus, ToolUse } from '@amzn/codewhisperer-streaming'
import { AgenticChatResultStream, progressPrefix } from '../agenticChatResultStream'
import { ChatSessionService } from '../../chat/chatSessionService'
import {
    Button,
    CancellationToken,
    ChatMessage,
    ChatResult,
    FileDetails,
    FileList,
    Status,
    TextDocument,
} from '@aws/language-server-runtimes/server-interface'
import {
    BUTTON_ALLOW_TOOLS,
    BUTTON_REJECT_MCP_TOOL,
    BUTTON_REJECT_SHELL_COMMAND,
    BUTTON_RUN_SHELL_COMMAND,
    BUTTON_STOP_SHELL_COMMAND,
    BUTTON_UNDO_ALL_CHANGES,
    BUTTON_UNDO_CHANGES,
    EXECUTE_BASH,
    FILE_SEARCH,
    FS_READ,
    FS_REPLACE,
    FS_WRITE,
    GREP_SEARCH,
    LIST_DIRECTORY,
    SUFFIX_EXPLANATION,
    SUFFIX_PERMISSION,
    SUFFIX_UNDOALL,
} from '../constants/toolConstants'
import { CommandCategory, ExecuteBash, ExecuteBashParams } from './executeBash'
import { FileSearch, FileSearchParams } from './fileSearch'
import {
    DEFAULT_MACOS_RUN_SHORTCUT,
    DEFAULT_WINDOW_RUN_SHORTCUT,
    DEFAULT_MACOS_REJECT_SHORTCUT,
    DEFAULT_WINDOW_REJECT_SHORTCUT,
    DEFAULT_MACOS_STOP_SHORTCUT,
    DEFAULT_WINDOW_STOP_SHORTCUT,
    OUTPUT_LIMIT_EXCEEDS_PARTIAL_MSG,
} from '../constants/constants'
import { Features } from '../../types'
import { validatePathBasic, validatePathExists } from '../utils/pathValidation'
import { FsRead, FsReadParams } from './fsRead'
import { FsReplace, FsReplaceParams } from './fsReplace'
import { FsWrite, FsWriteParams } from './fsWrite'
import { ListDirectory, ListDirectoryParams } from './listDirectory'
import { validatePaths as validatePathsSync } from '../utils/pathValidation'
import { CancellationError } from '@aws/lsp-core'
import path = require('path')
import { getCustomerFacingErrorMessage, isRequestAbortedError } from '../errors'
import { GrepSearch, SanitizedRipgrepOutput } from './grepSearch'
import { McpManager } from './mcp/mcpManager'
import { McpTool } from './mcp/mcpTool'
import { CodeReview } from './qCodeAnalysis/codeReview'
import {
    CODE_REVIEW_FINDINGS_MESSAGE_SUFFIX,
    DISPLAY_FINDINGS_MESSAGE_SUFFIX,
} from './qCodeAnalysis/codeReviewConstants'
import { DisplayFindings } from './qCodeAnalysis/displayFindings'
import { ExplanatoryParams, InvokeOutput, ToolApprovalException } from './toolShared'
import { enabledMCP, createNamespacedToolName } from './mcp/mcpUtils'
import { ChatTelemetryController } from '../../chat/telemetry/chatTelemetryController'
import { AgenticChatTriggerContext } from '../context/agenticChatTriggerContext'
import { AdditionalContextProvider } from '../context/additionalContextProvider'
import { diffLines } from 'diff'
import { toolResultMessage } from '../textFormatting'
import { isUsageLimitError } from '../../../shared/utils'
import { createDeferred } from '../utils/promises'
import { LatencyTracker } from '../utils/latencyTracker'

export class ToolExecutionManager {
    #features: Features
    #telemetryController: ChatTelemetryController
    #triggerContext: AgenticChatTriggerContext
    #additionalContextProvider: AdditionalContextProvider
    #toolUseStartTimes: Record<string, number> = {}
    #toolUseLatencies: Array<{ toolName: string; toolUseId: string; latency: number }> = []
    #stoppedToolUses = new Set<string>()
    #latencyTracker: LatencyTracker
    #toolStartTime: number = 0

    get stoppedToolUses(): Set<string> {
        return this.#stoppedToolUses
    }

    get toolUseLatencies(): Array<{ toolName: string; toolUseId: string; latency: number }> {
        return this.#toolUseLatencies
    }

    get toolStartTime(): number {
        return this.#toolStartTime
    }

    get toolUseStartTimes(): Record<string, number> {
        return this.#toolUseStartTimes
    }

    clearToolUseLatencies(): void {
        this.#toolUseLatencies = []
    }

    constructor(
        features: Features,
        triggerContext: AgenticChatTriggerContext,
        telemetryController: ChatTelemetryController,
        additionalContextProvider: AdditionalContextProvider,
        latencyTracker: LatencyTracker
    ) {
        this.#features = features
        this.#triggerContext = triggerContext
        this.#telemetryController = telemetryController
        this.#additionalContextProvider = additionalContextProvider
        this.#latencyTracker = latencyTracker
    }

    /**
     * Processes tool uses by running the tools and collecting results
     */
    async processToolUses(
        toolUses: Array<ToolUse & { stop: boolean }>,
        chatResultStream: AgenticChatResultStream,
        session: ChatSessionService,
        tabId: string,
        abTestingAllocation?: { experimentName: string; userVariation: string },
        token?: CancellationToken
    ): Promise<ToolResult[]> {
        const results: ToolResult[] = []

        for (const toolUse of toolUses) {
            // Store buttonBlockId to use it in `catch` block if needed
            let cachedButtonBlockId
            if (!toolUse.name || !toolUse.toolUseId) continue
            session.toolUseLookup.set(toolUse.toolUseId, toolUse)

            // Record the start time for this tool use for latency calculation
            if (toolUse.toolUseId) {
                this.#toolUseStartTimes[toolUse.toolUseId] = Date.now()
            }

            try {
                // TODO: Can we move this check in the event parser before the stream completes?
                const availableToolNames = this.#getTools(session).map(tool => tool.toolSpecification.name)
                if (!availableToolNames.includes(toolUse.name)) {
                    throw new Error(`Tool ${toolUse.name} is not available in the current mode`)
                }

                this.#recordChunk(`tool_execution_start - ${toolUse.name}`)
                this.#toolStartTime = Date.now()

                // remove progress UI
                await chatResultStream.removeResultBlockAndUpdateUI(progressPrefix + toolUse.toolUseId)

                // fsRead and listDirectory write to an existing card and could show nothing in the current position
                if (![FS_WRITE, FS_REPLACE, FS_READ, LIST_DIRECTORY].includes(toolUse.name)) {
                    await this.#showUndoAllIfRequired(chatResultStream, session)
                }
                // fsWrite can take a long time, so we render fsWrite  Explanatory upon partial streaming responses.
                if (toolUse.name !== FS_WRITE && toolUse.name !== FS_REPLACE) {
                    const { explanation } = toolUse.input as unknown as ExplanatoryParams
                    if (explanation) {
                        await chatResultStream.writeResultBlock({
                            type: 'directive',
                            messageId: toolUse.toolUseId + SUFFIX_EXPLANATION,
                            body: explanation,
                        })
                    }
                }
                switch (toolUse.name) {
                    case FS_READ:
                    case LIST_DIRECTORY:
                    case GREP_SEARCH:
                    case FILE_SEARCH:
                    case FS_WRITE:
                    case FS_REPLACE:
                    case EXECUTE_BASH: {
                        const toolMap = {
                            [FS_READ]: { Tool: FsRead },
                            [LIST_DIRECTORY]: { Tool: ListDirectory },
                            [FS_WRITE]: { Tool: FsWrite },
                            [FS_REPLACE]: { Tool: FsReplace },
                            [EXECUTE_BASH]: { Tool: ExecuteBash },
                            [GREP_SEARCH]: { Tool: GrepSearch },
                            [FILE_SEARCH]: { Tool: FileSearch },
                        }

                        const { Tool } = toolMap[toolUse.name as keyof typeof toolMap]
                        const tool = new Tool(this.#features)

                        // For MCP tools, get the permission from McpManager
                        // const permission = McpManager.instance.getToolPerm('Built-in', toolUse.name)
                        // If permission is 'alwaysAllow', we don't need to ask for acceptance
                        // const builtInPermission = permission !== 'alwaysAllow'

                        // Get the approved paths from the session
                        const approvedPaths = session.approvedPaths

                        // Pass the approved paths to the tool's requiresAcceptance method
                        const { requiresAcceptance, warning, commandCategory } = await tool.requiresAcceptance(
                            toolUse.input as any,
                            approvedPaths
                        )

                        // Honor built-in permission if available, otherwise use tool's requiresAcceptance
                        // const requiresAcceptance = builtInPermission || toolRequiresAcceptance

                        if (requiresAcceptance || toolUse.name === EXECUTE_BASH) {
                            // for executeBash, we till send the confirmation message without action buttons
                            const confirmationResult = this.#processToolConfirmation(
                                toolUse,
                                requiresAcceptance,
                                warning,
                                commandCategory
                            )
                            cachedButtonBlockId = await chatResultStream.writeResultBlock(confirmationResult)
                            const isExecuteBash = toolUse.name === EXECUTE_BASH
                            if (isExecuteBash) {
                                this.#telemetryController.emitInteractWithAgenticChat(
                                    'GeneratedCommand',
                                    tabId,
                                    session.pairProgrammingMode,
                                    session.getConversationType(),
                                    abTestingAllocation?.experimentName,
                                    abTestingAllocation?.userVariation
                                )
                            }
                            if (requiresAcceptance) {
                                await this.#waitForToolApproval(
                                    toolUse,
                                    chatResultStream,
                                    cachedButtonBlockId,
                                    session,
                                    toolUse.name
                                )
                            }
                            if (isExecuteBash) {
                                this.#telemetryController.emitInteractWithAgenticChat(
                                    'RunCommand',
                                    tabId,
                                    session.pairProgrammingMode,
                                    session.getConversationType(),
                                    abTestingAllocation?.experimentName,
                                    abTestingAllocation?.userVariation
                                )
                            }
                        }
                        break
                    }
                    case CodeReview.toolName:
                    case DisplayFindings.toolName:
                        // no need to write tool message for CodeReview or DisplayFindings
                        break
                    // — DEFAULT ⇒ Only MCP tools, but can also handle generic tool execution messages
                    default:
                        // Get original server and tool names from the mapping
                        const originalNames = McpManager.instance.getOriginalToolNames(toolUse.name)

                        // Remove explanation field from toolUse.input for MCP tools
                        // many MCP servers do not support explanation field and it will break the tool if this is altered
                        if (
                            originalNames &&
                            toolUse.input &&
                            typeof toolUse.input === 'object' &&
                            'explanation' in toolUse.input
                        ) {
                            const { explanation, ...inputWithoutExplanation } = toolUse.input as any
                            toolUse.input = inputWithoutExplanation
                        }

                        if (originalNames) {
                            const { serverName, toolName } = originalNames
                            const def = McpManager.instance
                                .getAllTools()
                                .find(d => d.serverName === serverName && d.toolName === toolName)
                            if (def) {
                                const mcpTool = new McpTool(this.#features, def)
                                const { requiresAcceptance, warning } = await mcpTool.requiresAcceptance(
                                    serverName,
                                    toolName
                                )
                                if (requiresAcceptance) {
                                    const confirmation = this.#processToolConfirmation(
                                        toolUse,
                                        requiresAcceptance,
                                        warning,
                                        undefined,
                                        toolName // Pass the original tool name here
                                    )
                                    cachedButtonBlockId = await chatResultStream.writeResultBlock(confirmation)
                                    await this.#waitForToolApproval(
                                        toolUse,
                                        chatResultStream,
                                        cachedButtonBlockId,
                                        session,
                                        toolName
                                    )
                                }

                                // Store the blockId in the session for later use
                                if (toolUse.toolUseId) {
                                    // Use a type assertion to add the runningCardBlockId property
                                    const toolUseWithBlockId = {
                                        ...toolUse,
                                        cachedButtonBlockId,
                                    } as typeof toolUse & { cachedButtonBlockId: number }

                                    session.toolUseLookup.set(toolUse.toolUseId, toolUseWithBlockId)
                                }
                                break
                            }
                        }
                        break
                }

                if (toolUse.name === FS_WRITE || toolUse.name === FS_REPLACE) {
                    const input = toolUse.input as unknown as FsWriteParams | FsReplaceParams
                    const document = await this.#triggerContext.getTextDocumentFromPath(input.path, true, true)

                    session.toolUseLookup.set(toolUse.toolUseId, {
                        ...toolUse,
                        fileChange: { before: document?.getText() },
                    })
                }

                if (toolUse.name === CodeReview.toolName) {
                    try {
                        let initialInput = JSON.parse(JSON.stringify(toolUse.input))
                        let ruleArtifacts = await this.#additionalContextProvider.collectWorkspaceRules(tabId)
                        if (ruleArtifacts !== undefined || ruleArtifacts !== null) {
                            this.#features.logging.info(`RuleArtifacts: ${JSON.stringify(ruleArtifacts)}`)
                            let pathsToRulesMap = ruleArtifacts.map(ruleArtifact => ({ path: ruleArtifact.id }))
                            this.#features.logging.info(`PathsToRules: ${JSON.stringify(pathsToRulesMap)}`)
                            initialInput['ruleArtifacts'] = pathsToRulesMap
                        }
                        toolUse.input = initialInput
                    } catch (e) {
                        this.#features.logging.warn(`could not parse CodeReview tool input: ${e}`)
                    }
                }

                // After approval, add the path to the approved paths in the session
                const inputPath = (toolUse.input as any)?.path || (toolUse.input as any)?.cwd
                if (inputPath) {
                    session.addApprovedPath(inputPath)
                }

                const ws = this.#getWritableStream(chatResultStream, toolUse)
                const result = await this.#features.agent.runTool(toolUse.name, toolUse.input, token, ws)

                let toolResultContent: ToolResultContentBlock

                if (typeof result === 'string') {
                    toolResultContent = { text: result }
                } else if (Array.isArray(result)) {
                    toolResultContent = { json: { items: result } }
                } else if (typeof result === 'object') {
                    toolResultContent = { json: result }
                } else toolResultContent = { text: JSON.stringify(result) }
                this.#validateToolResult(toolUse, toolResultContent)

                results.push({
                    toolUseId: toolUse.toolUseId,
                    status: 'success',
                    content: [toolResultContent],
                })

                switch (toolUse.name) {
                    case FS_READ:
                    case LIST_DIRECTORY:
                    case FILE_SEARCH:
                        const initialListDirResult = this.#processReadOrListOrSearch(toolUse, chatResultStream)
                        if (initialListDirResult) {
                            await chatResultStream.writeResultBlock(initialListDirResult)
                        }
                        break
                    // no need to write tool result for listDir,fsRead,fileSearch into chat stream
                    case EXECUTE_BASH:
                        // no need to write tool result for listDir and fsRead into chat stream
                        // executeBash will stream the output instead of waiting until the end
                        break
                    case GREP_SEARCH:
                        const grepSearchResult = this.#processGrepSearchResult(toolUse, result, chatResultStream)
                        if (grepSearchResult) {
                            await chatResultStream.writeResultBlock(grepSearchResult)
                        }
                        break
                    case FS_REPLACE:
                    case FS_WRITE:
                        const input = toolUse.input as unknown as FsWriteParams | FsReplaceParams
                        // Load from the filesystem instead of workspace.
                        // Workspace is likely out of date - when files
                        // are modified external to the IDE, many IDEs
                        // will only update their file contents (which
                        // then propagates to the LSP) if/when that
                        // document receives focus.
                        const doc = await this.#triggerContext.getTextDocumentFromPath(input.path, false, true)
                        const chatResult = await this.#getFsWriteChatResult(toolUse, doc, session)
                        const cachedToolUse = session.toolUseLookup.get(toolUse.toolUseId)
                        if (cachedToolUse) {
                            session.toolUseLookup.set(toolUse.toolUseId, {
                                ...cachedToolUse,
                                chatResult,
                                fileChange: { ...cachedToolUse.fileChange, after: doc?.getText() },
                            })
                        }
                        this.#telemetryController.emitInteractWithAgenticChat(
                            'GeneratedDiff',
                            tabId,
                            session.pairProgrammingMode,
                            session.getConversationType(),
                            abTestingAllocation?.experimentName,
                            abTestingAllocation?.userVariation
                        )
                        await chatResultStream.writeResultBlock(chatResult)
                        break
                    case CodeReview.toolName:
                        // no need to write tool result for code review, this is handled by model via chat
                        // Push result in message so that it is picked by IDE plugin to show in issues panel
                        const codeReviewResult = result as InvokeOutput
                        if (
                            codeReviewResult?.output?.kind === 'json' &&
                            codeReviewResult.output.success &&
                            (codeReviewResult.output.content as any)?.findingsByFile
                        ) {
                            await chatResultStream.writeResultBlock({
                                type: 'tool',
                                messageId: toolUse.toolUseId + CODE_REVIEW_FINDINGS_MESSAGE_SUFFIX,
                                body: (codeReviewResult.output.content as any).findingsByFile,
                            })
                        }
                        break
                    case DisplayFindings.toolName:
                        // no need to write tool result for code review, this is handled by model via chat
                        // Push result in message so that it is picked by IDE plugin to show in issues panel
                        const displayFindingsResult = result as InvokeOutput
                        if (
                            displayFindingsResult?.output?.kind === 'json' &&
                            displayFindingsResult.output.success &&
                            displayFindingsResult.output.content !== undefined
                        ) {
                            await chatResultStream.writeResultBlock({
                                type: 'tool',
                                messageId: toolUse.toolUseId + DISPLAY_FINDINGS_MESSAGE_SUFFIX,
                                body: JSON.stringify(displayFindingsResult.output.content),
                            })
                        }
                        break
                    // — DEFAULT ⇒ MCP tools
                    default:
                        await this.#handleMcpToolResult(toolUse, result, session, chatResultStream)
                        break
                }
                this.#updateUndoAllState(toolUse, session)

                if (toolUse.name && toolUse.toolUseId) {
                    // Calculate latency if we have a start time for this tool use
                    let latency: number | undefined = undefined
                    if (this.#toolUseStartTimes[toolUse.toolUseId]) {
                        latency = Date.now() - this.#toolUseStartTimes[toolUse.toolUseId]
                        delete this.#toolUseStartTimes[toolUse.toolUseId]

                        if (latency !== undefined) {
                            this.#toolUseLatencies.push({
                                toolName: toolUse.name,
                                toolUseId: toolUse.toolUseId,
                                latency: latency,
                            })
                        }
                    }

                    this.#telemetryController.emitToolUseSuggested(
                        toolUse,
                        session.conversationId ?? '',
                        this.#features.runtime.serverInfo.version ?? '',
                        latency,
                        session.pairProgrammingMode,
                        abTestingAllocation?.experimentName,
                        abTestingAllocation?.userVariation,
                        'Succeeded'
                    )
                }
            } catch (err) {
                await this.#showUndoAllIfRequired(chatResultStream, session)
                if (this.#isUserAction(err, token)) {
                    // Handle ToolApprovalException for any tool
                    if (err instanceof ToolApprovalException && cachedButtonBlockId) {
                        await chatResultStream.overwriteResultBlock(
                            this.#getUpdateToolConfirmResult(toolUse, false, toolUse.name),
                            cachedButtonBlockId
                        )
                        if (err.shouldShowMessage) {
                            await chatResultStream.writeResultBlock({
                                type: 'answer',
                                messageId: `reject-message-${toolUse.toolUseId}`,
                                body: err.message || 'Command was rejected.',
                            })
                        }
                    } else if (err instanceof ToolApprovalException) {
                        this.#features.logging.warn('Failed to update tool block: no blockId is available.')
                    }

                    // Handle CancellationError
                    if (err instanceof CancellationError) {
                        results.push({
                            toolUseId: toolUse.toolUseId,
                            status: ToolResultStatus.ERROR,
                            content: [{ text: 'Command stopped by user' }],
                        })
                        continue
                    }

                    // Rethrow error for executeBash or any named tool
                    if (toolUse.name === EXECUTE_BASH || toolUse.name) {
                        throw err
                    }
                } else {
                    // only emit if this is an actual tool error (not a user rejecting/canceling tool)
                    this.#telemetryController.emitToolUseSuggested(
                        toolUse,
                        session.conversationId ?? '',
                        this.#features.runtime.serverInfo.version ?? '',
                        undefined,
                        session.pairProgrammingMode,
                        abTestingAllocation?.experimentName,
                        abTestingAllocation?.userVariation,
                        'Failed'
                    )
                }

                // display fs write failure status in the UX of that file card
                if ((toolUse.name === FS_WRITE || toolUse.name === FS_REPLACE) && toolUse.toolUseId) {
                    const existingCard = chatResultStream.getMessageBlockId(toolUse.toolUseId)
                    const fsParam = toolUse.input as unknown as FsWriteParams | FsReplaceParams
                    if (fsParam.path) {
                        const fileName = path.basename(fsParam.path)
                        const customerFacingError = getCustomerFacingErrorMessage(err)
                        const errorResult = {
                            type: 'tool',
                            messageId: toolUse.toolUseId,
                            header: {
                                fileList: {
                                    filePaths: [fileName],
                                    details: {
                                        [fileName]: {
                                            description: fsParam.path,
                                        },
                                    },
                                },
                                status: {
                                    status: 'error',
                                    icon: 'cancel-circle',
                                    text: 'Error',
                                    description: customerFacingError,
                                },
                            },
                        } as ChatResult

                        if (existingCard) {
                            await chatResultStream.overwriteResultBlock(errorResult, existingCard)
                        } else {
                            await chatResultStream.writeResultBlock(errorResult)
                        }
                    }
                } else if (toolUse.name === EXECUTE_BASH && toolUse.toolUseId) {
                    const existingCard = chatResultStream.getMessageBlockId(toolUse.toolUseId)
                    const command = (toolUse.input as unknown as ExecuteBashParams).command
                    const completedErrorResult = {
                        type: 'tool',
                        messageId: toolUse.toolUseId,
                        body: `\`\`\`shell\n${command}\n\`\`\``,
                        header: {
                            body: 'shell',
                            status: {
                                status: 'success',
                                icon: 'ok',
                                text: 'Completed',
                            },
                            buttons: [],
                        },
                    } as ChatResult

                    if (existingCard) {
                        await chatResultStream.overwriteResultBlock(completedErrorResult, existingCard)
                    } else {
                        this.#features.chat.sendChatUpdate({
                            tabId,
                            state: { inProgress: false },
                            data: {
                                messages: [completedErrorResult],
                            },
                        })
                    }
                    this.#stoppedToolUses.add(toolUse.toolUseId)
                }
                const errMsg = err instanceof Error ? err.message : 'unknown error'
                this.#log(`Error running tool ${toolUse.name}:`, errMsg)
                results.push({
                    toolUseId: toolUse.toolUseId,
                    status: ToolResultStatus.ERROR,
                    content: [{ json: { error: err instanceof Error ? err.message : 'Unknown error' } }],
                })
            }
        }

        return results
    }

    #validateToolResult(toolUse: ToolUse, result: ToolResultContentBlock) {
        let maxToolResponseSize
        switch (toolUse.name) {
            case FS_READ:
            case EXECUTE_BASH:
                // fsRead and executeBash already have truncation logic
                return
            case LIST_DIRECTORY:
                maxToolResponseSize = 50_000
                break
            default:
                maxToolResponseSize = 100_000
                break
        }
        if (
            (result.text && result.text.length > maxToolResponseSize) ||
            (result.json && JSON.stringify(result.json).length > maxToolResponseSize)
        ) {
            throw Error(`${toolUse.name} ${OUTPUT_LIMIT_EXCEEDS_PARTIAL_MSG} ${maxToolResponseSize}`)
        }
    }

    /**
     * Creates a promise that does not resolve until the user accepts or rejects the tool usage.
     * @param toolUseId
     * @param toolUseName
     * @param resultStream
     * @param promptBlockId id of approval block. This allows us to overwrite the buttons with 'accepted' or 'rejected' text.
     * @param session
     */
    async #waitForToolApproval(
        toolUse: ToolUse,
        resultStream: AgenticChatResultStream,
        promptBlockId: number,
        session: ChatSessionService,
        toolName: string
    ): Promise<void> {
        const deferred = createDeferred()
        session.setDeferredToolExecution(toolUse.toolUseId!, deferred.resolve, deferred.reject)
        this.#log(`Prompting for tool approval for tool: ${toolName ?? toolUse.name}`)
        await deferred.promise
        // Note: we want to overwrite the button block because it already exists in the stream.
        await resultStream.overwriteResultBlock(
            this.#getUpdateToolConfirmResult(toolUse, true, toolName),
            promptBlockId
        )
    }

    #processToolConfirmation(
        toolUse: ToolUse,
        requiresAcceptance: Boolean,
        warning?: string,
        commandCategory?: CommandCategory,
        toolType?: string,
        builtInPermission?: boolean
    ): ChatResult {
        const toolName = toolType || toolUse.name
        let buttons: Button[] = []
        let header: {
            body: string
            buttons: Button[]
            icon?: string
            iconForegroundStatus?: string
            status?: {
                status?: Status
                position?: 'left' | 'right'
                description?: string
                icon?: string
                text?: string
            }
        }
        let body: string | undefined

        // Configure tool-specific UI elements
        switch (toolName) {
            case EXECUTE_BASH: {
                const commandString = (toolUse.input as unknown as ExecuteBashParams).command
                // get feature flag
                const shortcut =
                    this.#features.lsp.getClientInitializeParams()?.initializationOptions?.aws?.awsClientCapabilities?.q
                        ?.shortcut

                const runKey = this.#getKeyBinding('aws.amazonq.runCmdExecution')
                const rejectKey = this.#getKeyBinding('aws.amazonq.rejectCmdExecution')

                buttons = requiresAcceptance
                    ? [
                          {
                              id: BUTTON_RUN_SHELL_COMMAND,
                              text: 'Run',
                              icon: 'play',
                              ...(runKey ? { description: `Run:  ${runKey}` } : {}),
                          },
                          {
                              id: BUTTON_REJECT_SHELL_COMMAND,
                              status: 'dimmed-clear' as Status,
                              text: 'Reject',
                              icon: 'cancel',
                              ...(rejectKey ? { description: `Reject:  ${rejectKey}` } : {}),
                          },
                      ]
                    : []

                const statusIcon =
                    commandCategory === CommandCategory.Destructive
                        ? 'warning'
                        : commandCategory === CommandCategory.Mutate
                          ? 'info'
                          : 'none'
                const statusType =
                    commandCategory === CommandCategory.Destructive
                        ? 'warning'
                        : commandCategory === CommandCategory.Mutate
                          ? 'info'
                          : undefined

                header = {
                    status: requiresAcceptance
                        ? {
                              icon: statusIcon,
                              status: statusType,
                              position: 'left',
                              description: this.#getCommandCategoryDescription(
                                  commandCategory ?? CommandCategory.ReadOnly
                              ),
                          }
                        : {},
                    body: 'shell',
                    buttons,
                }
                body = '```shell\n' + commandString
                break
            }

            case FS_WRITE: {
                const writeFilePath = (toolUse.input as unknown as FsWriteParams).path

                // Validate the path using our synchronous utility
                validatePathBasic(writeFilePath)

                this.#debug(`Processing ${toolUse.name} for path: ${writeFilePath}`)
                buttons = [{ id: BUTTON_ALLOW_TOOLS, text: 'Allow', icon: 'ok', status: 'clear' }]
                header = {
                    icon: 'warning',
                    iconForegroundStatus: 'warning',
                    body: builtInPermission
                        ? '#### Allow file modification'
                        : '#### Allow file modification outside of your workspace',
                    buttons,
                }
                body = builtInPermission
                    ? `I need permission to modify files.\n\`${writeFilePath}\``
                    : `I need permission to modify files outside of your workspace.\n\`${writeFilePath}\``
                break
            }

            case FS_REPLACE: {
                const writeFilePath = (toolUse.input as unknown as FsReplaceParams).path

                // For replace, we need to verify the file exists
                validatePathExists(writeFilePath)

                this.#debug(`Processing ${toolUse.name} for path: ${writeFilePath}`)
                buttons = [{ id: BUTTON_ALLOW_TOOLS, text: 'Allow', icon: 'ok', status: 'clear' }]
                header = {
                    icon: 'warning',
                    iconForegroundStatus: 'warning',
                    body: builtInPermission
                        ? '#### Allow file modification'
                        : '#### Allow file modification outside of your workspace',
                    buttons,
                }
                body = builtInPermission
                    ? `I need permission to modify files.\n\`${writeFilePath}\``
                    : `I need permission to modify files outside of your workspace.\n\`${writeFilePath}\``
                break
            }

            case FS_READ:
            case LIST_DIRECTORY: {
                buttons = [{ id: BUTTON_ALLOW_TOOLS, text: 'Allow', icon: 'ok', status: 'clear' }]
                header = {
                    icon: 'tools',
                    iconForegroundStatus: 'tools',
                    body: builtInPermission
                        ? '#### Allow read-only tools'
                        : '#### Allow read-only tools outside your workspace',
                    buttons,
                }

                if (toolName === FS_READ) {
                    const paths = (toolUse.input as unknown as FsReadParams).paths

                    // Validate paths using our synchronous utility
                    validatePathsSync(paths)

                    this.#debug(`Processing ${toolUse.name} for paths: ${JSON.stringify(paths)}`)
                    const formattedPaths: string[] = []
                    paths.forEach(element => formattedPaths.push(`\`${element}\``))
                    body = builtInPermission
                        ? `I need permission to read files.\n${formattedPaths.join('\n')}`
                        : `I need permission to read files outside the workspace.\n${formattedPaths.join('\n')}`
                } else {
                    const readFilePath = (toolUse.input as unknown as ListDirectoryParams).path

                    // Validate the path using our synchronous utility
                    validatePathExists(readFilePath)

                    this.#debug(`Processing ${toolUse.name} for path: ${readFilePath}`)
                    body = builtInPermission
                        ? `I need permission to list directories.\n\`${readFilePath}\``
                        : `I need permission to list directories outside the workspace.\n\`${readFilePath}\``
                }
                break
            }

            default: {
                // — DEFAULT ⇒ MCP tools
                buttons = [{ id: BUTTON_ALLOW_TOOLS, text: 'Allow', icon: 'ok', status: 'clear' }]
                header = {
                    icon: 'tools',
                    iconForegroundStatus: 'warning',
                    body: `#### ${toolName}`,
                    buttons,
                }
                body = ' '
                break
            }
        }

        // Determine if this is a built-in tool or MCP tool
        const isStandardTool = toolName !== undefined && this.#features.agent.getBuiltInToolNames().includes(toolName)

        if (isStandardTool) {
            return {
                type: 'tool',
                messageId: this.#getMessageIdForToolUse(toolType, toolUse),
                header,
                body: warning ? (toolName === EXECUTE_BASH ? '' : '\n\n') + body : body,
            }
        } else {
            return {
                type: 'tool',
                messageId: toolUse.toolUseId,
                summary: {
                    content: {
                        header: {
                            icon: 'tools',
                            body: `${toolName}`,
                            buttons: [
                                { id: BUTTON_ALLOW_TOOLS, text: 'Run', icon: 'play', status: 'clear' },
                                {
                                    id: BUTTON_REJECT_MCP_TOOL,
                                    text: 'Reject',
                                    icon: 'cancel',
                                    status: 'dimmed-clear' as Status,
                                },
                            ],
                        },
                    },
                    collapsedContent: [
                        {
                            header: { body: 'Parameters' },
                            body: `\`\`\`json\n${JSON.stringify(toolUse.input, null, 2)}\n\`\`\``,
                        },
                    ],
                },
            }
        }
    }

    /**
     * Creates an updated ChatResult for tool confirmation based on tool type
     * @param toolUse The tool use object
     * @param isAccept Whether the tool was accepted or rejected
     * @param toolType Optional tool type for specialized handling
     * @returns ChatResult with appropriate confirmation UI
     */
    getUpdateToolConfirmResult(
        toolUse: ToolUse,
        isAccept: boolean,
        originalToolName: string,
        toolType?: string
    ): ChatResult {
        const toolName = originalToolName ?? (toolType || toolUse.name)

        // Handle bash commands with special formatting
        if (toolName === EXECUTE_BASH) {
            return {
                messageId: toolUse.toolUseId,
                type: 'tool',
                body: '```shell\n' + (toolUse.input as unknown as ExecuteBashParams).command,
                header: {
                    body: 'shell',
                    ...(isAccept
                        ? {}
                        : {
                              status: {
                                  status: 'error',
                                  icon: 'cancel',
                                  text: 'Rejected',
                              },
                          }),
                    buttons: isAccept ? [this.#renderStopShellCommandButton()] : [],
                },
            }
        }

        // For file operations and other tools, create appropriate confirmation UI
        let header: {
            body: string | undefined
            status: { status: 'info' | 'success' | 'warning' | 'error'; icon: string; text: string }
        }
        let body: string | undefined

        switch (toolName) {
            case FS_REPLACE:
            case FS_WRITE:
            case FS_READ:
            case LIST_DIRECTORY:
                header = {
                    body: undefined,
                    status: {
                        status: 'success',
                        icon: 'ok',
                        text: 'Allowed',
                    },
                }
                break

            case FILE_SEARCH:
                const searchPath = (toolUse.input as unknown as FileSearchParams).path
                header = {
                    body: 'File Search',
                    status: {
                        status: isAccept ? 'success' : 'error',
                        icon: isAccept ? 'ok' : 'cancel',
                        text: isAccept ? 'Allowed' : 'Rejected',
                    },
                }
                body = `File search ${isAccept ? 'allowed' : 'rejected'}: \`${searchPath}\``
                break

            default:
                // Default tool (not only MCP)
                return {
                    type: 'tool',
                    messageId: toolUse.toolUseId!,
                    summary: {
                        content: {
                            header: {
                                icon: 'tools',
                                body: `${originalToolName ?? (toolType || toolUse.name)}`,
                                status: {
                                    status: isAccept ? 'success' : 'error',
                                    icon: isAccept ? 'ok' : 'cancel',
                                    text: isAccept ? 'Completed' : 'Rejected',
                                },
                                fileList: undefined,
                            },
                        },
                        collapsedContent: [
                            {
                                header: {
                                    body: 'Parameters',
                                    status: undefined,
                                },
                                body: `\`\`\`json\n${JSON.stringify(toolUse.input, null, 2)}\n\`\`\``,
                            },
                        ],
                    },
                }
        }

        return {
            messageId: this.#getMessageIdForToolUse(toolType, toolUse),
            type: 'tool',
            body,
            header,
        }
    }

    async #getFsWriteChatResult(
        toolUse: ToolUse,
        doc: TextDocument | undefined,
        session: ChatSessionService
    ): Promise<ChatMessage> {
        const input = toolUse.input as unknown as FsWriteParams | FsReplaceParams
        const oldContent = session.toolUseLookup.get(toolUse.toolUseId!)?.fileChange?.before ?? ''
        // Get just the filename instead of the full path
        const fileName = path.basename(input.path)
        const diffChanges = diffLines(oldContent, doc?.getText() ?? '')
        const changes = diffChanges.reduce(
            (acc, { count = 0, added, removed }) => {
                if (added) {
                    acc.added += count
                } else if (removed) {
                    acc.deleted += count
                }
                return acc
            },
            { added: 0, deleted: 0 }
        )
        return {
            type: 'tool',
            messageId: toolUse.toolUseId,
            header: {
                fileList: {
                    filePaths: [fileName],
                    details: {
                        [fileName]: {
                            changes,
                            description: input.path,
                        },
                    },
                },
                buttons: [{ id: BUTTON_UNDO_CHANGES, text: 'Undo', icon: 'undo' }],
            },
        }
    }

    #processReadOrListOrSearch(toolUse: ToolUse, chatResultStream: AgenticChatResultStream): ChatMessage | undefined {
        let messageIdToUpdate = toolUse.toolUseId!
        const currentId = chatResultStream.getMessageIdToUpdateForTool(toolUse.name!)

        if (currentId) {
            messageIdToUpdate = currentId
        } else {
            chatResultStream.setMessageIdToUpdateForTool(toolUse.name!, messageIdToUpdate)
        }
        let currentPaths = []
        if (toolUse.name === FS_READ) {
            currentPaths = (toolUse.input as unknown as FsReadParams)?.paths
        } else {
            currentPaths.push((toolUse.input as unknown as ListDirectoryParams | FileSearchParams)?.path)
        }

        if (!currentPaths) return

        for (const currentPath of currentPaths) {
            const existingPaths = chatResultStream.getMessageOperation(messageIdToUpdate)?.filePaths || []
            // Check if path already exists in the list
            const isPathAlreadyProcessed = existingPaths.some(path => path.relativeFilePath === currentPath)
            if (!isPathAlreadyProcessed) {
                const currentFileDetail = {
                    relativeFilePath: currentPath,
                    lineRanges: [{ first: -1, second: -1 }],
                }
                chatResultStream.addMessageOperation(messageIdToUpdate, toolUse.name!, [
                    ...existingPaths,
                    currentFileDetail,
                ])
            }
        }
        let title: string
        const itemCount = chatResultStream.getMessageOperation(messageIdToUpdate)?.filePaths.length
        const filePathsPushed = chatResultStream.getMessageOperation(messageIdToUpdate)?.filePaths ?? []
        if (!itemCount) {
            title = 'Gathering context'
        } else {
            title =
                toolUse.name === FS_READ
                    ? `${itemCount} file${itemCount > 1 ? 's' : ''} read`
                    : toolUse.name === FILE_SEARCH
                      ? `${itemCount} ${itemCount === 1 ? 'directory' : 'directories'} searched`
                      : `${itemCount} ${itemCount === 1 ? 'directory' : 'directories'} listed`
        }
        const details: Record<string, FileDetails> = {}
        for (const item of filePathsPushed) {
            details[item.relativeFilePath] = {
                lineRanges: item.lineRanges,
                description: item.relativeFilePath,
            }
        }

        const fileList: FileList = {
            rootFolderTitle: title,
            filePaths: filePathsPushed.map(item => item.relativeFilePath),
            details,
        }
        return {
            type: 'tool',
            fileList,
            messageId: messageIdToUpdate,
            body: '',
        }
    }

    /**
     * Process grep search results and format them for display in the chat UI
     */
    #processGrepSearchResult(
        toolUse: ToolUse,
        result: any,
        chatResultStream: AgenticChatResultStream
    ): ChatMessage | undefined {
        if (toolUse.name !== GREP_SEARCH) {
            return undefined
        }

        let messageIdToUpdate = toolUse.toolUseId!
        const currentId = chatResultStream.getMessageIdToUpdateForTool(toolUse.name!)

        if (currentId) {
            messageIdToUpdate = currentId
        } else {
            chatResultStream.setMessageIdToUpdateForTool(toolUse.name!, messageIdToUpdate)
        }

        // Extract search results from the tool output
        const output = result.output.content as SanitizedRipgrepOutput
        if (!output || !output.fileMatches || !Array.isArray(output.fileMatches)) {
            return {
                type: 'tool',
                messageId: messageIdToUpdate,
                body: 'No search results found.',
            }
        }

        // Process the matches into a structured format
        const matches = output.fileMatches
        const fileDetails: Record<string, FileDetails> = {}

        // Create file details directly from matches
        for (const match of matches) {
            const filePath = match.filePath
            if (!filePath) continue

            fileDetails[`${filePath} (${match.matches.length} ${match.matches.length <= 1 ? 'result' : 'results'})`] = {
                description: filePath,
                lineRanges: [{ first: -1, second: -1 }],
            }
        }

        // Create sorted array of file paths
        const sortedFilePaths = Object.keys(fileDetails)

        // Create the context list for display
        const query = (toolUse.input as any)?.query || 'search term'

        const contextList: FileList = {
            rootFolderTitle: `Grepped for "${query}", ${output.matchCount}  ${output.matchCount <= 1 ? 'result' : 'results'} found`,
            filePaths: sortedFilePaths,
            details: fileDetails,
        }

        return {
            type: 'tool',
            fileList: contextList,
            messageId: messageIdToUpdate,
            body: '',
        }
    }

    #getToolOverWritableStream(
        chatResultStream: AgenticChatResultStream,
        toolUse: ToolUse
    ): WritableStream | undefined {
        const toolMsgId = toolUse.toolUseId!

        return new WritableStream({
            write: async chunk => {
                if (this.#stoppedToolUses.has(toolMsgId)) return

                await chatResultStream.removeResultBlockAndUpdateUI(toolMsgId)

                await chatResultStream.writeResultBlock({
                    type: 'tool',
                    messageId: toolMsgId,
                    body: chunk,
                })
            },
            close: async () => {
                if (this.#stoppedToolUses.has(toolMsgId)) return

                await chatResultStream.removeResultBlockAndUpdateUI(toolMsgId)

                this.#stoppedToolUses.add(toolMsgId)
            },
        })
    }

    #getWritableStream(chatResultStream: AgenticChatResultStream, toolUse: ToolUse): WritableStream | undefined {
        if (toolUse.name === CodeReview.toolName) {
            return this.#getToolOverWritableStream(chatResultStream, toolUse)
        }
        if (toolUse.name !== EXECUTE_BASH) {
            return
        }

        const toolMsgId = toolUse.toolUseId!
        const chatMsgId = chatResultStream.getResult().messageId
        let headerEmitted = false

        const initialHeader: ChatMessage['header'] = {
            body: 'shell',
            buttons: [this.#renderStopShellCommandButton()],
        }

        const completedHeader: ChatMessage['header'] = {
            body: 'shell',
            status: { status: 'success', icon: 'ok', text: 'Completed' },
            buttons: [],
        }

        return new WritableStream({
            write: async chunk => {
                if (this.#stoppedToolUses.has(toolMsgId)) return

                await chatResultStream.writeResultBlock({
                    type: 'tool',
                    messageId: toolMsgId,
                    body: chunk,
                    header: headerEmitted ? undefined : initialHeader,
                })

                headerEmitted = true
            },

            close: async () => {
                if (this.#stoppedToolUses.has(toolMsgId)) return

                await chatResultStream.writeResultBlock({
                    type: 'tool',
                    messageId: toolMsgId,
                    body: '```',
                    header: completedHeader,
                })

                await chatResultStream.writeResultBlock({
                    type: 'answer',
                    messageId: chatMsgId,
                    body: '',
                    header: undefined,
                })

                this.#stoppedToolUses.add(toolMsgId)
            },
        })
    }

    /**
     * Creates an updated ChatResult for tool confirmation based on tool type
     * @param toolUse The tool use object
     * @param isAccept Whether the tool was accepted or rejected
     * @param toolType Optional tool type for specialized handling
     * @returns ChatResult with appropriate confirmation UI
     */
    #getUpdateToolConfirmResult(
        toolUse: ToolUse,
        isAccept: boolean,
        originalToolName: string,
        toolType?: string
    ): ChatResult {
        const toolName = originalToolName ?? (toolType || toolUse.name)

        // Handle bash commands with special formatting
        if (toolName === EXECUTE_BASH) {
            return {
                messageId: toolUse.toolUseId,
                type: 'tool',
                body: '```shell\n' + (toolUse.input as unknown as ExecuteBashParams).command,
                header: {
                    body: 'shell',
                    ...(isAccept
                        ? {}
                        : {
                              status: {
                                  status: 'error',
                                  icon: 'cancel',
                                  text: 'Rejected',
                              },
                          }),
                    buttons: isAccept ? [this.#renderStopShellCommandButton()] : [],
                },
            }
        }

        // For file operations and other tools, create appropriate confirmation UI
        let header: {
            body: string | undefined
            status: { status: 'info' | 'success' | 'warning' | 'error'; icon: string; text: string }
        }
        let body: string | undefined

        switch (toolName) {
            case FS_REPLACE:
            case FS_WRITE:
            case FS_READ:
            case LIST_DIRECTORY:
                header = {
                    body: undefined,
                    status: {
                        status: 'success',
                        icon: 'ok',
                        text: 'Allowed',
                    },
                }
                break

            case FILE_SEARCH:
                const searchPath = (toolUse.input as unknown as FileSearchParams).path
                header = {
                    body: 'File Search',
                    status: {
                        status: isAccept ? 'success' : 'error',
                        icon: isAccept ? 'ok' : 'cancel',
                        text: isAccept ? 'Allowed' : 'Rejected',
                    },
                }
                body = `File search ${isAccept ? 'allowed' : 'rejected'}: \`${searchPath}\``
                break

            default:
                // Default tool (not only MCP)
                return {
                    type: 'tool',
                    messageId: toolUse.toolUseId!,
                    summary: {
                        content: {
                            header: {
                                icon: 'tools',
                                body: `${originalToolName ?? (toolType || toolUse.name)}`,
                                status: {
                                    status: isAccept ? 'success' : 'error',
                                    icon: isAccept ? 'ok' : 'cancel',
                                    text: isAccept ? 'Completed' : 'Rejected',
                                },
                                fileList: undefined,
                            },
                        },
                        collapsedContent: [
                            {
                                header: {
                                    body: 'Parameters',
                                    status: undefined,
                                },
                                body: `\`\`\`json\n${JSON.stringify(toolUse.input, null, 2)}\n\`\`\``,
                            },
                        ],
                    },
                }
        }

        return {
            messageId: this.#getMessageIdForToolUse(toolType, toolUse),
            type: 'tool',
            body,
            header,
        }
    }

    #renderStopShellCommandButton() {
        const stopKey = this.#getKeyBinding('aws.amazonq.stopCmdExecution')
        return {
            id: BUTTON_STOP_SHELL_COMMAND,
            text: 'Stop',
            icon: 'stop',
            ...(stopKey ? { description: `Stop:  ${stopKey}` } : {}),
        }
    }

    /**
     * Determines the appropriate message ID for a tool use based on tool type and name
     * @param toolType The type of tool being used
     * @param toolUse The tool use object
     * @returns The message ID to use
     */
    #getMessageIdForToolUse(toolType: string | undefined, toolUse: ToolUse): string {
        const toolUseId = toolUse.toolUseId!
        // Return plain toolUseId for executeBash, add "_permission" suffix for all other tools
        return toolUse.name === EXECUTE_BASH || toolType === EXECUTE_BASH
            ? toolUseId
            : `${toolUseId}${SUFFIX_PERMISSION}`
    }

    #getKeyBinding(commandId: string): string | null {
        // Check for feature flag
        const shortcut =
            this.#features.lsp.getClientInitializeParams()?.initializationOptions?.aws?.awsClientCapabilities?.q
                ?.shortcut
        if (!shortcut) {
            return null
        }
        let defaultKey = ''
        const OS = os.platform()

        switch (commandId) {
            case 'aws.amazonq.runCmdExecution':
                defaultKey = OS === 'darwin' ? DEFAULT_MACOS_RUN_SHORTCUT : DEFAULT_WINDOW_RUN_SHORTCUT
                break
            case 'aws.amazonq.rejectCmdExecution':
                defaultKey = OS === 'darwin' ? DEFAULT_MACOS_REJECT_SHORTCUT : DEFAULT_WINDOW_REJECT_SHORTCUT
                break
            case 'aws.amazonq.stopCmdExecution':
                defaultKey = OS === 'darwin' ? DEFAULT_MACOS_STOP_SHORTCUT : DEFAULT_WINDOW_STOP_SHORTCUT
                break
            default:
                this.#log(`#getKeyBinding: ${commandId} shortcut is supported by Q `)
                break
        }

        if (defaultKey === '') {
            return null
        }

        //TODO: handle case: user change default keybind, suggestion: read `keybinding.json` provided by VSC

        return defaultKey
    }

    /**
     * Get a description for the tooltip based on command category
     * @param commandCategory The category of the command
     * @returns A descriptive message for the tooltip
     */
    #getCommandCategoryDescription(category: CommandCategory): string | undefined {
        switch (category) {
            case CommandCategory.Mutate:
                return 'This command may modify your code and/or files.'
            case CommandCategory.Destructive:
                return 'This command may cause significant data loss or damage.'
            default:
                return undefined
        }
    }

    #getTools(session: ChatSessionService) {
        const builtInWriteTools = new Set(this.#features.agent.getBuiltInWriteToolNames())
        const allTools = this.#features.agent.getTools({ format: 'bedrock' })
        if (!enabledMCP(this.#features.lsp.getClientInitializeParams())) {
            if (!session.pairProgrammingMode) {
                return allTools.filter(tool => !builtInWriteTools.has(tool.toolSpecification?.name || ''))
            }
            return allTools
        }

        // Clear tool name mapping to avoid conflicts from previous registrations
        McpManager.instance.clearToolNameMapping()

        const tempMapping = new Map<string, { serverName: string; toolName: string }>()

        // Read Only Tools = All Tools - Restricted Tools (MCP + Write Tools)
        // TODO: mcp tool spec name will be server___tool.
        // TODO: Will also need to handle rare edge cases of long server name + long tool name > 64 char
        const allNamespacedTools = new Set<string>()
        const mcpToolSpecNames = new Set(
            McpManager.instance
                .getAllTools()
                .map(tool => createNamespacedToolName(tool.serverName, tool.toolName, allNamespacedTools, tempMapping))
        )

        McpManager.instance.setToolNameMapping(tempMapping)
        const restrictedToolNames = new Set([...mcpToolSpecNames, ...builtInWriteTools])

        const readOnlyTools = allTools.filter(tool => {
            const toolName = tool.toolSpecification.name
            return !restrictedToolNames.has(toolName)
        })
        return session.pairProgrammingMode ? allTools : readOnlyTools
    }

    /**
     * Handles the result of an MCP tool execution
     * @param toolUse The tool use object
     * @param result The result from running the tool
     * @param session The chat session
     * @param chatResultStream The chat result stream for writing/updating blocks
     */
    async #handleMcpToolResult(
        toolUse: ToolUse,
        result: any,
        session: ChatSessionService,
        chatResultStream: AgenticChatResultStream
    ): Promise<void> {
        // Early return if name or toolUseId is undefined
        if (!toolUse.name || !toolUse.toolUseId) {
            this.#log(`Cannot handle MCP tool result: missing name or toolUseId`)
            return
        }

        // Get original server and tool names from the mapping
        const originalNames = McpManager.instance.getOriginalToolNames(toolUse.name)
        if (originalNames) {
            const { serverName, toolName } = originalNames
            const def = McpManager.instance
                .getAllTools()
                .find(d => d.serverName === serverName && d.toolName === toolName)
            if (def) {
                // Format the tool result and input as JSON strings
                const toolInput = JSON.stringify(toolUse.input, null, 2)
                const toolResultContent = typeof result === 'string' ? result : JSON.stringify(result, null, 2)

                const toolResultCard: ChatMessage = {
                    type: 'tool',
                    messageId: toolUse.toolUseId,
                    summary: {
                        content: {
                            header: {
                                icon: 'tools',
                                body: `${toolName}`,
                                fileList: undefined,
                            },
                        },
                        collapsedContent: [
                            {
                                header: {
                                    body: 'Parameters',
                                },
                                body: `\`\`\`json\n${toolInput}\n\`\`\``,
                            },
                            {
                                header: {
                                    body: 'Result',
                                },
                                body: `\`\`\`json\n${toolResultContent}\n\`\`\``,
                            },
                        ],
                    },
                }

                // Get the stored blockId for this tool use
                const cachedToolUse = session.toolUseLookup.get(toolUse.toolUseId)
                const cachedButtonBlockId = (cachedToolUse as any)?.cachedButtonBlockId

                if (cachedButtonBlockId !== undefined) {
                    // Update the existing card with the results
                    await chatResultStream.overwriteResultBlock(toolResultCard, cachedButtonBlockId)
                } else {
                    // Fallback to creating a new card
                    this.#log(`Warning: No blockId found for tool use ${toolUse.toolUseId}, creating new card`)
                    await chatResultStream.writeResultBlock(toolResultCard)
                }
                return
            }
        }

        // Fallback for tools not found in mapping
        await chatResultStream.writeResultBlock({
            type: 'tool',
            messageId: toolUse.toolUseId,
            body: toolResultMessage(toolUse, result),
        })
    }

    /**
     * Shows an "Undo all changes" button if there are multiple related file changes
     * that can be undone together.
     */
    async #showUndoAllIfRequired(chatResultStream: AgenticChatResultStream, session: ChatSessionService) {
        if (session.currentUndoAllId === undefined) {
            return
        }

        const toUndo = session.toolUseLookup.get(session.currentUndoAllId)?.relatedToolUses
        if (!toUndo || toUndo.size <= 1) {
            session.currentUndoAllId = undefined
            return
        }

        await chatResultStream.writeResultBlock({
            type: 'answer',
            messageId: `${session.currentUndoAllId}${SUFFIX_UNDOALL}`,
            buttons: [
                {
                    id: BUTTON_UNDO_ALL_CHANGES,
                    text: 'Undo all changes',
                    icon: 'undo',
                    status: 'clear',
                    keepCardAfterClick: false,
                },
            ],
        })
        session.currentUndoAllId = undefined
    }

    /**
     * Updates the currentUndoAllId state in the session
     */
    #updateUndoAllState(toolUse: ToolUse, session: ChatSessionService) {
        if (toolUse.name === FS_READ || toolUse.name === LIST_DIRECTORY) {
            return
        }
        if (toolUse.name === FS_WRITE || toolUse.name === FS_REPLACE) {
            if (session.currentUndoAllId === undefined) {
                session.currentUndoAllId = toolUse.toolUseId
            }
            if (session.currentUndoAllId) {
                const prev = session.toolUseLookup.get(session.currentUndoAllId)
                if (prev && toolUse.toolUseId) {
                    const relatedToolUses = prev.relatedToolUses || new Set()
                    relatedToolUses.add(toolUse.toolUseId)

                    session.toolUseLookup.set(session.currentUndoAllId, {
                        ...prev,
                        relatedToolUses,
                    })
                }
            }
        } else {
            session.currentUndoAllId = undefined
        }
    }

    /**
     * Determines if error is thrown as a result of a user action (Ex. rejecting tool, stop button)
     * @param err
     * @returns
     */
    #isUserAction(err: unknown, token?: CancellationToken, session?: ChatSessionService): boolean {
        return (
            !isUsageLimitError(err) &&
            (CancellationError.isUserCancelled(err) ||
                err instanceof ToolApprovalException ||
                isRequestAbortedError(err) ||
                (token?.isCancellationRequested ?? false))
        )
    }

    /**
     * Calculates time to first chunk and time between chunks
     */
    #recordChunk(chunkType: string) {
        this.#latencyTracker.recordChunk(chunkType)
    }

    #log(...messages: string[]) {
        this.#features.logging.log(messages.join(' '))
    }

    #debug(...messages: string[]) {
        this.#features.logging.debug(messages.join(' '))
    }
}
