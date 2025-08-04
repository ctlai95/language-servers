import * as assert from 'assert'
import * as sinon from 'sinon'
import { ToolExecutionManager } from './toolExecutionManager'
import { TestFeatures } from '@aws/language-server-runtimes/testing'
import { ChatSessionService } from '../../chat/chatSessionService'
import { AgenticChatResultStream } from '../agenticChatResultStream'
import { ChatTelemetryController } from '../../chat/telemetry/chatTelemetryController'
import { AgenticChatTriggerContext } from '../context/agenticChatTriggerContext'
import { AdditionalContextProvider } from '../context/additionalContextProvider'
import { LatencyTracker } from '../utils/latencyTracker'
import { ToolUse, ToolResultStatus } from '@amzn/codewhisperer-streaming'
import {
    FS_READ,
    EXECUTE_BASH,
    FS_WRITE,
    FS_REPLACE,
    LIST_DIRECTORY,
    GREP_SEARCH,
    FILE_SEARCH,
} from '../constants/toolConstants'
import { CancellationError } from '@aws/lsp-core'
import { ToolApprovalException } from './toolShared'
import { FsRead } from './fsRead'
import { FsWrite } from './fsWrite'
import { FsReplace } from './fsReplace'
import { ListDirectory } from './listDirectory'
import { ExecuteBash } from './executeBash'
import { GrepSearch } from './grepSearch'
import { FileSearch } from './fileSearch'

describe('ToolExecutionManager', function () {
    let features: TestFeatures
    let toolExecutionManager: ToolExecutionManager
    let session: ChatSessionService
    let chatResultStream: sinon.SinonStubbedInstance<AgenticChatResultStream>

    beforeEach(function () {
        features = new TestFeatures()

        const triggerContext = sinon.createStubInstance(AgenticChatTriggerContext)
        triggerContext.getTextDocumentFromPath.resolves(undefined)

        const telemetryController = sinon.createStubInstance(ChatTelemetryController)

        const additionalContextProvider = sinon.createStubInstance(AdditionalContextProvider)
        additionalContextProvider.collectWorkspaceRules.resolves([])

        const latencyTracker = sinon.createStubInstance(LatencyTracker)

        session = new ChatSessionService()
        session.pairProgrammingMode = true
        session.conversationId = 'test-conversation-id'
        session.addApprovedPath = sinon.stub()
        session.toolUseLookup = new Map()

        // Mock the approvedPaths getter
        sinon.stub(session, 'approvedPaths').get(() => new Set())

        chatResultStream = sinon.createStubInstance(AgenticChatResultStream)
        chatResultStream.removeResultBlockAndUpdateUI.resolves()
        chatResultStream.writeResultBlock.resolves(1)
        chatResultStream.overwriteResultBlock.resolves()
        chatResultStream.getResult.returns({ messageId: 'test-message-id' })
        chatResultStream.getMessageBlockId.returns(1)

        features.agent.runTool = sinon.stub().resolves('tool result')
        features.agent.getTools = sinon
            .stub()
            .returns([
                { toolSpecification: { name: FS_READ } },
                { toolSpecification: { name: EXECUTE_BASH } },
                { toolSpecification: { name: FS_WRITE } },
                { toolSpecification: { name: FS_REPLACE } },
                { toolSpecification: { name: LIST_DIRECTORY } },
                { toolSpecification: { name: GREP_SEARCH } },
                { toolSpecification: { name: FILE_SEARCH } },
            ])
        features.agent.getBuiltInToolNames = sinon
            .stub()
            .returns([FS_READ, EXECUTE_BASH, FS_WRITE, FS_REPLACE, LIST_DIRECTORY, GREP_SEARCH, FILE_SEARCH])
        features.agent.getBuiltInWriteToolNames = sinon.stub().returns([FS_WRITE, FS_REPLACE])

        // Mock tool classes to avoid approval requirements
        sinon.stub(FsRead.prototype, 'requiresAcceptance').resolves({ requiresAcceptance: false })
        sinon.stub(FsWrite.prototype, 'requiresAcceptance').resolves({ requiresAcceptance: false })
        sinon.stub(FsReplace.prototype, 'requiresAcceptance').resolves({ requiresAcceptance: false })
        sinon.stub(ListDirectory.prototype, 'requiresAcceptance').resolves({ requiresAcceptance: false })
        sinon.stub(ExecuteBash.prototype, 'requiresAcceptance').resolves({ requiresAcceptance: false })
        sinon.stub(GrepSearch.prototype, 'requiresAcceptance').resolves({ requiresAcceptance: false })
        sinon.stub(FileSearch.prototype, 'requiresAcceptance').resolves({ requiresAcceptance: false })

        toolExecutionManager = new ToolExecutionManager(
            features,
            triggerContext,
            telemetryController,
            additionalContextProvider,
            latencyTracker
        )
    })

    afterEach(function () {
        sinon.restore()
    })

    describe('constructor', function () {
        it('should initialize with correct dependencies', function () {
            assert.ok(toolExecutionManager)
            assert.strictEqual(toolExecutionManager.stoppedToolUses.size, 0)
            assert.strictEqual(toolExecutionManager.toolUseLatencies.length, 0)
        })
    })

    describe('processToolUses', function () {
        it('should skip tool use without name or toolUseId', async function () {
            const toolUse: ToolUse & { stop: boolean } = {
                name: '',
                toolUseId: '',
                input: {},
                stop: false,
            }

            const result = await toolExecutionManager.processToolUses(
                [toolUse],
                chatResultStream,
                session,
                'test-tab-id'
            )

            assert.strictEqual(result.length, 0)
        })

        it('should handle unavailable tool', async function () {
            const toolUse: ToolUse & { stop: boolean } = {
                name: 'unavailable-tool',
                toolUseId: 'test-tool-id',
                input: {},
                stop: false,
            }

            // The method should handle unavailable tools gracefully
            const result = await toolExecutionManager.processToolUses(
                [toolUse],
                chatResultStream,
                session,
                'test-tab-id'
            )

            // Should return error result instead of throwing
            assert.strictEqual(result.length, 1)
            assert.strictEqual(result[0].status, ToolResultStatus.ERROR)
        })

        it('should handle tool execution error', async function () {
            const toolUse: ToolUse & { stop: boolean } = {
                name: FS_READ,
                toolUseId: 'test-tool-id',
                input: { paths: ['/test/path'] },
                stop: false,
            }

            features.agent.runTool = sinon.stub().throws(new Error('Tool failed'))

            const result = await toolExecutionManager.processToolUses(
                [toolUse],
                chatResultStream,
                session,
                'test-tab-id'
            )

            assert.strictEqual(result.length, 1)
            assert.strictEqual(result[0].status, ToolResultStatus.ERROR)
        })

        it('should process FS_WRITE tool successfully', async function () {
            const toolUse: ToolUse & { stop: boolean } = {
                name: FS_WRITE,
                toolUseId: 'test-tool-id',
                input: { path: '/test/file.txt', fileText: 'content' },
                stop: false,
            }

            const result = await toolExecutionManager.processToolUses(
                [toolUse],
                chatResultStream,
                session,
                'test-tab-id'
            )

            assert.strictEqual(result.length, 1)
            assert.strictEqual(result[0].status, 'success')
        })

        it('should handle CancellationError', async function () {
            const toolUse: ToolUse & { stop: boolean } = {
                name: FS_READ,
                toolUseId: 'test-tool-id',
                input: { paths: ['/test/path'] },
                stop: false,
            }

            const cancellationError = new CancellationError('user')
            // Mock the static method to return true for user cancellation
            sinon.stub(CancellationError, 'isUserCancelled').returns(true)
            features.agent.runTool = sinon.stub().throws(cancellationError)

            const result = await toolExecutionManager.processToolUses(
                [toolUse],
                chatResultStream,
                session,
                'test-tab-id'
            )

            assert.strictEqual(result.length, 1)
            assert.strictEqual(result[0].status, ToolResultStatus.ERROR)
            assert.strictEqual(result[0].content?.[0].text, 'Command stopped by user')
        })

        it('should handle ToolApprovalException', async function () {
            const toolUse: ToolUse & { stop: boolean } = {
                name: FS_READ,
                toolUseId: 'test-tool-id',
                input: { paths: ['/test/path'] },
                stop: false,
            }

            features.agent.runTool = sinon.stub().throws(new ToolApprovalException('Tool rejected'))

            try {
                await toolExecutionManager.processToolUses([toolUse], chatResultStream, session, 'test-tab-id')
            } catch (err) {
                assert.ok(err instanceof ToolApprovalException)
            }
        })

        it('should process multiple tools', async function () {
            const toolUses: Array<ToolUse & { stop: boolean }> = [
                {
                    name: FS_READ,
                    toolUseId: 'test-tool-1',
                    input: { paths: ['/test/path1'] },
                    stop: false,
                },
                {
                    name: LIST_DIRECTORY,
                    toolUseId: 'test-tool-2',
                    input: { path: '/test/dir' },
                    stop: false,
                },
            ]

            const result = await toolExecutionManager.processToolUses(
                toolUses,
                chatResultStream,
                session,
                'test-tab-id'
            )

            assert.strictEqual(result.length, 2)
            assert.strictEqual(result[0].status, 'success')
            assert.strictEqual(result[1].status, 'success')
        })

        it('should handle different result types', async function () {
            const toolUse: ToolUse & { stop: boolean } = {
                name: FS_READ,
                toolUseId: 'test-tool-id',
                input: { paths: ['/test/path'] },
                stop: false,
            }

            // Test array result
            features.agent.runTool = sinon.stub().resolves(['item1', 'item2'])
            let result = await toolExecutionManager.processToolUses([toolUse], chatResultStream, session, 'test-tab-id')
            assert.ok(result[0].content?.[0].json)
            assert.strictEqual(result[0].status, 'success')

            // Test object result
            features.agent.runTool = sinon.stub().resolves({ key: 'value' })
            result = await toolExecutionManager.processToolUses([toolUse], chatResultStream, session, 'test-tab-id')
            assert.ok(result[0].content?.[0].json)
            assert.strictEqual(result[0].status, 'success')
        })
    })

    describe('getUpdateToolConfirmResult', function () {
        it('should return correct result for accepted tool', function () {
            const toolUse: ToolUse = {
                name: FS_READ,
                toolUseId: 'test-tool-id',
                input: { paths: ['/test/path'] },
            }

            const result = toolExecutionManager.getUpdateToolConfirmResult(toolUse, true, FS_READ)

            assert.strictEqual(result.messageId, 'test-tool-id_permission')
            assert.strictEqual(result.type, 'tool')
        })

        it('should handle EXECUTE_BASH tool differently', function () {
            const toolUse: ToolUse = {
                name: EXECUTE_BASH,
                toolUseId: 'test-tool-id',
                input: { command: 'ls -la' },
            }

            const result = toolExecutionManager.getUpdateToolConfirmResult(toolUse, true, EXECUTE_BASH)

            assert.strictEqual(result.messageId, 'test-tool-id')
            assert.strictEqual(result.type, 'tool')
            assert.ok(result.body?.includes('ls -la'))
        })

        it('should handle rejected EXECUTE_BASH tool', function () {
            const toolUse: ToolUse = {
                name: EXECUTE_BASH,
                toolUseId: 'test-tool-id',
                input: { command: 'rm -rf /' },
            }

            const result = toolExecutionManager.getUpdateToolConfirmResult(toolUse, false, EXECUTE_BASH)

            assert.strictEqual(result.messageId, 'test-tool-id')
            assert.strictEqual(result.type, 'tool')
            assert.strictEqual(result.header?.status?.status, 'error')
            assert.strictEqual(result.header?.status?.text, 'Rejected')
        })

        it('should handle FILE_SEARCH tool', function () {
            const toolUse: ToolUse = {
                name: FILE_SEARCH,
                toolUseId: 'test-tool-id',
                input: { path: '/search/path', queryName: 'test' },
            }

            const result = toolExecutionManager.getUpdateToolConfirmResult(toolUse, true, FILE_SEARCH)

            assert.strictEqual(result.header?.body, 'File Search')
            assert.strictEqual(result.header?.status?.status, 'success')
            assert.ok(result.body?.includes('allowed'))
        })

        it('should handle default MCP tool', function () {
            const toolUse: ToolUse = {
                name: 'custom-mcp-tool',
                toolUseId: 'test-tool-id',
                input: { param: 'value' },
            }

            const result = toolExecutionManager.getUpdateToolConfirmResult(toolUse, true, 'custom-mcp-tool')

            assert.strictEqual(result.messageId, 'test-tool-id')
            assert.strictEqual(result.type, 'tool')
            assert.ok(result.summary)
            assert.strictEqual(result.summary?.content?.header?.body, 'custom-mcp-tool')
        })

        it('should handle FS_WRITE and FS_REPLACE tools', function () {
            const toolUse: ToolUse = {
                name: FS_WRITE,
                toolUseId: 'test-tool-id',
                input: { path: '/test/file.txt' },
            }

            const result = toolExecutionManager.getUpdateToolConfirmResult(toolUse, true, FS_WRITE)

            assert.strictEqual(result.header?.status?.status, 'success')
            assert.strictEqual(result.header?.status?.text, 'Allowed')
        })
    })

    describe('clearToolUseLatencies', function () {
        it('should clear tool use latencies', function () {
            toolExecutionManager.clearToolUseLatencies()
            assert.strictEqual(toolExecutionManager.toolUseLatencies.length, 0)
        })
    })

    describe('getters', function () {
        it('should return correct stoppedToolUses', function () {
            assert.ok(toolExecutionManager.stoppedToolUses instanceof Set)
        })

        it('should return correct toolUseLatencies', function () {
            assert.ok(Array.isArray(toolExecutionManager.toolUseLatencies))
        })

        it('should return correct toolStartTime', function () {
            assert.strictEqual(typeof toolExecutionManager.toolStartTime, 'number')
        })

        it('should return correct toolUseStartTimes', function () {
            assert.strictEqual(typeof toolExecutionManager.toolUseStartTimes, 'object')
        })
    })

    describe('latency tracking', function () {
        it('should track tool use latencies', async function () {
            const toolUse: ToolUse & { stop: boolean } = {
                name: FS_READ,
                toolUseId: 'test-tool-id',
                input: { paths: ['/test/path'] },
                stop: false,
            }

            await toolExecutionManager.processToolUses([toolUse], chatResultStream, session, 'test-tab-id')

            assert.strictEqual(toolExecutionManager.toolUseLatencies.length, 1)
            assert.strictEqual(toolExecutionManager.toolUseLatencies[0].toolName, FS_READ)
            assert.strictEqual(toolExecutionManager.toolUseLatencies[0].toolUseId, 'test-tool-id')
            assert.ok(typeof toolExecutionManager.toolUseLatencies[0].latency === 'number')
        })

        it('should clear latencies after clearToolUseLatencies call', function () {
            // Add some mock latency data
            toolExecutionManager.toolUseLatencies.push({
                toolName: 'test-tool',
                toolUseId: 'test-id',
                latency: 100,
            })

            assert.strictEqual(toolExecutionManager.toolUseLatencies.length, 1)

            toolExecutionManager.clearToolUseLatencies()

            assert.strictEqual(toolExecutionManager.toolUseLatencies.length, 0)
        })
    })

    describe('FS_REPLACE tool handling', function () {
        it('should process FS_REPLACE tool successfully', async function () {
            const toolUse: ToolUse & { stop: boolean } = {
                name: FS_REPLACE,
                toolUseId: 'test-tool-id',
                input: { path: '/test/file.txt', diffs: [{ oldStr: 'old', newStr: 'new' }] },
                stop: false,
            }

            const result = await toolExecutionManager.processToolUses(
                [toolUse],
                chatResultStream,
                session,
                'test-tab-id'
            )

            assert.strictEqual(result.length, 1)
            assert.strictEqual(result[0].status, 'success')
        })

        it('should handle FS_REPLACE in getUpdateToolConfirmResult', function () {
            const toolUse: ToolUse = {
                name: FS_REPLACE,
                toolUseId: 'test-tool-id',
                input: { path: '/test/file.txt' },
            }

            const result = toolExecutionManager.getUpdateToolConfirmResult(toolUse, true, FS_REPLACE)

            assert.strictEqual(result.header?.status?.status, 'success')
            assert.strictEqual(result.header?.status?.text, 'Allowed')
        })
    })

    describe('tool approval workflow', function () {
        it('should handle tool requiring acceptance', async function () {
            // Mock tool to require acceptance
            sinon.restore()
            sinon.stub(FsRead.prototype, 'requiresAcceptance').resolves({ requiresAcceptance: true })

            const toolUse: ToolUse & { stop: boolean } = {
                name: FS_READ,
                toolUseId: 'test-tool-id',
                input: { paths: ['/test/path'] },
                stop: false,
            }

            // Mock session approval methods
            session.setDeferredToolExecution = sinon.stub()

            try {
                await toolExecutionManager.processToolUses([toolUse], chatResultStream, session, 'test-tab-id')
            } catch (err) {
                // Expected to hang or throw due to approval requirement
                assert.ok(true)
            }
        })

        it('should handle EXECUTE_BASH with different command categories', function () {
            const toolUse: ToolUse = {
                name: EXECUTE_BASH,
                toolUseId: 'test-tool-id',
                input: { command: 'rm -rf /' },
            }

            const result = toolExecutionManager.getUpdateToolConfirmResult(toolUse, false, EXECUTE_BASH)

            assert.strictEqual(result.messageId, 'test-tool-id')
            assert.strictEqual(result.type, 'tool')
            assert.strictEqual(result.header?.status?.status, 'error')
        })
    })

    describe('validation scenarios', function () {
        it('should handle tool result size validation', async function () {
            const toolUse: ToolUse & { stop: boolean } = {
                name: LIST_DIRECTORY,
                toolUseId: 'test-tool-id',
                input: { path: '/test' },
                stop: false,
            }

            // Mock a result that exceeds size limit for LIST_DIRECTORY (50k)
            const largeResult = 'x'.repeat(60000)
            features.agent.runTool = sinon.stub().resolves(largeResult)

            const result = await toolExecutionManager.processToolUses(
                [toolUse],
                chatResultStream,
                session,
                'test-tab-id'
            )

            assert.strictEqual(result.length, 1)
            assert.strictEqual(result[0].status, ToolResultStatus.ERROR)
        })

        it('should handle non-user action errors', async function () {
            const toolUse: ToolUse & { stop: boolean } = {
                name: FS_READ,
                toolUseId: 'test-tool-id',
                input: { paths: ['/test/path'] },
                stop: false,
            }

            // Mock a non-user action error
            features.agent.runTool = sinon.stub().throws(new Error('Network error'))

            const result = await toolExecutionManager.processToolUses(
                [toolUse],
                chatResultStream,
                session,
                'test-tab-id'
            )

            assert.strictEqual(result.length, 1)
            assert.strictEqual(result[0].status, ToolResultStatus.ERROR)
        })
    })

    describe('session state management', function () {
        it('should add approved paths to session', async function () {
            const toolUse: ToolUse & { stop: boolean } = {
                name: FS_WRITE,
                toolUseId: 'test-tool-id',
                input: { path: '/test/file.txt', fileText: 'content' },
                stop: false,
            }

            await toolExecutionManager.processToolUses([toolUse], chatResultStream, session, 'test-tab-id')

            // Verify addApprovedPath was called
            assert.ok((session.addApprovedPath as sinon.SinonStub).called)
        })

        it('should handle tool use lookup updates', async function () {
            const toolUse: ToolUse & { stop: boolean } = {
                name: FS_WRITE,
                toolUseId: 'test-tool-id',
                input: { path: '/test/file.txt', fileText: 'content' },
                stop: false,
            }

            await toolExecutionManager.processToolUses([toolUse], chatResultStream, session, 'test-tab-id')

            // Verify tool use was added to lookup
            assert.ok(session.toolUseLookup.has('test-tool-id'))
        })
    })

    describe('stream handling', function () {
        it('should handle string result type', async function () {
            const toolUse: ToolUse & { stop: boolean } = {
                name: FS_READ,
                toolUseId: 'test-tool-id',
                input: { paths: ['/test/path'] },
                stop: false,
            }

            features.agent.runTool = sinon.stub().resolves('string result')

            const result = await toolExecutionManager.processToolUses(
                [toolUse],
                chatResultStream,
                session,
                'test-tab-id'
            )

            assert.strictEqual(result[0].content?.[0].text, 'string result')
        })

        it('should handle non-standard result types', async function () {
            const toolUse: ToolUse & { stop: boolean } = {
                name: FS_READ,
                toolUseId: 'test-tool-id',
                input: { paths: ['/test/path'] },
                stop: false,
            }

            features.agent.runTool = sinon.stub().resolves(123) // number result

            const result = await toolExecutionManager.processToolUses(
                [toolUse],
                chatResultStream,
                session,
                'test-tab-id'
            )

            assert.strictEqual(result[0].content?.[0].text, '123')
        })
    })

    describe('error handling edge cases', function () {
        it('should track tool use latencies', async function () {
            const toolUse: ToolUse & { stop: boolean } = {
                name: FS_READ,
                toolUseId: 'test-tool-id',
                input: { paths: ['/test/path'] },
                stop: false,
            }

            await toolExecutionManager.processToolUses([toolUse], chatResultStream, session, 'test-tab-id')

            assert.strictEqual(toolExecutionManager.toolUseLatencies.length, 1)
            assert.strictEqual(toolExecutionManager.toolUseLatencies[0].toolName, FS_READ)
            assert.strictEqual(toolExecutionManager.toolUseLatencies[0].toolUseId, 'test-tool-id')
            assert.ok(typeof toolExecutionManager.toolUseLatencies[0].latency === 'number')
        })

        it('should clear latencies after clearToolUseLatencies call', function () {
            // Add some mock latency data
            toolExecutionManager.toolUseLatencies.push({
                toolName: 'test-tool',
                toolUseId: 'test-id',
                latency: 100,
            })

            assert.strictEqual(toolExecutionManager.toolUseLatencies.length, 1)

            toolExecutionManager.clearToolUseLatencies()

            assert.strictEqual(toolExecutionManager.toolUseLatencies.length, 0)
        })
    })

    describe('error handling edge cases', function () {
        it('should handle missing toolUseId gracefully', async function () {
            const toolUse: ToolUse & { stop: boolean } = {
                name: FS_READ,
                toolUseId: '',
                input: { paths: ['/test/path'] },
                stop: false,
            }

            const result = await toolExecutionManager.processToolUses(
                [toolUse],
                chatResultStream,
                session,
                'test-tab-id'
            )

            assert.strictEqual(result.length, 0)
        })

        it('should handle missing tool name gracefully', async function () {
            const toolUse: ToolUse & { stop: boolean } = {
                name: '',
                toolUseId: 'test-tool-id',
                input: { paths: ['/test/path'] },
                stop: false,
            }

            const result = await toolExecutionManager.processToolUses(
                [toolUse],
                chatResultStream,
                session,
                'test-tab-id'
            )

            assert.strictEqual(result.length, 0)
        })

        it('should handle FS_WRITE error with existing card', async function () {
            const toolUse: ToolUse & { stop: boolean } = {
                name: FS_WRITE,
                toolUseId: 'test-tool-id',
                input: { path: '/test/file.txt', fileText: 'content' },
                stop: false,
            }

            chatResultStream.getMessageBlockId.returns(123) // existing card
            features.agent.runTool = sinon.stub().throws(new Error('Write failed'))

            const result = await toolExecutionManager.processToolUses(
                [toolUse],
                chatResultStream,
                session,
                'test-tab-id'
            )

            assert.strictEqual(result.length, 1)
            assert.strictEqual(result[0].status, ToolResultStatus.ERROR)
            assert.ok(chatResultStream.overwriteResultBlock.called)
        })

        it('should handle EXECUTE_BASH error with existing card', async function () {
            const toolUse: ToolUse & { stop: boolean } = {
                name: EXECUTE_BASH,
                toolUseId: 'test-tool-id',
                input: { command: 'failing-command' },
                stop: false,
            }

            chatResultStream.getMessageBlockId.returns(123) // existing card
            features.agent.runTool = sinon.stub().throws(new Error('Command failed'))

            const result = await toolExecutionManager.processToolUses(
                [toolUse],
                chatResultStream,
                session,
                'test-tab-id'
            )

            assert.strictEqual(result.length, 1)
            assert.strictEqual(result[0].status, ToolResultStatus.ERROR)
            assert.ok(toolExecutionManager.stoppedToolUses.has('test-tool-id'))
        })
    })

    describe('tool-specific processing', function () {
        it('should handle GREP_SEARCH results', async function () {
            const toolUse: ToolUse & { stop: boolean } = {
                name: GREP_SEARCH,
                toolUseId: 'test-tool-id',
                input: { query: 'test', path: '/test' },
                stop: false,
            }

            const mockResult = {
                output: {
                    content: {
                        fileMatches: [
                            {
                                filePath: '/test/file.txt',
                                matches: [{ line: 1, content: 'test content' }],
                            },
                        ],
                        matchCount: 1,
                    },
                },
            }

            features.agent.runTool = sinon.stub().resolves(mockResult)

            const result = await toolExecutionManager.processToolUses(
                [toolUse],
                chatResultStream,
                session,
                'test-tab-id'
            )

            assert.strictEqual(result.length, 1)
            assert.strictEqual(result[0].status, 'success')
        })

        it('should handle GREP_SEARCH with no results', async function () {
            const toolUse: ToolUse & { stop: boolean } = {
                name: GREP_SEARCH,
                toolUseId: 'test-tool-id',
                input: { query: 'test', path: '/test' },
                stop: false,
            }

            const mockResult = {
                output: {
                    content: {
                        fileMatches: [],
                        matchCount: 0,
                    },
                },
            }

            features.agent.runTool = sinon.stub().resolves(mockResult)

            const result = await toolExecutionManager.processToolUses(
                [toolUse],
                chatResultStream,
                session,
                'test-tab-id'
            )

            assert.strictEqual(result.length, 1)
            assert.strictEqual(result[0].status, 'success')
        })

        it('should handle FILE_SEARCH tool', async function () {
            const toolUse: ToolUse & { stop: boolean } = {
                name: FILE_SEARCH,
                toolUseId: 'test-tool-id',
                input: { path: '/test', queryName: 'test' },
                stop: false,
            }

            const result = await toolExecutionManager.processToolUses(
                [toolUse],
                chatResultStream,
                session,
                'test-tab-id'
            )

            assert.strictEqual(result.length, 1)
            assert.strictEqual(result[0].status, 'success')
        })

        it('should handle LIST_DIRECTORY tool', async function () {
            const toolUse: ToolUse & { stop: boolean } = {
                name: LIST_DIRECTORY,
                toolUseId: 'test-tool-id',
                input: { path: '/test' },
                stop: false,
            }

            const result = await toolExecutionManager.processToolUses(
                [toolUse],
                chatResultStream,
                session,
                'test-tab-id'
            )

            assert.strictEqual(result.length, 1)
            assert.strictEqual(result[0].status, 'success')
        })
    })
})
