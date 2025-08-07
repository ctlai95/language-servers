import { Features } from '../../types'

export class LatencyTracker {
    #features: Features
    #llmRequestStartTime: number = 0
    #timeToFirstChunk: number = -1
    #timeBetweenChunks: number[] = []
    #lastChunkTime: number = 0

    constructor(features: Features) {
        this.#features = features
    }

    setLlmRequestStartTime(time: number): void {
        this.#llmRequestStartTime = time
    }

    recordChunk(chunkType: string): void {
        if (this.#timeToFirstChunk === -1) {
            this.#timeToFirstChunk = Date.now() - this.#llmRequestStartTime
            this.#lastChunkTime = Date.now()
        } else {
            const timeBetweenChunks = Date.now() - this.#lastChunkTime
            this.#timeBetweenChunks.push(timeBetweenChunks)
            this.#lastChunkTime = Date.now()
            if (chunkType !== 'chunk') {
                this.#features.logging.debug(
                    `Time between chunks [${chunkType}]: ${timeBetweenChunks}ms (total chunks: ${this.#timeBetweenChunks.length})`
                )
            }
        }
    }

    get timeToFirstChunk(): number {
        return this.#timeToFirstChunk
    }

    get timeBetweenChunks(): number[] {
        return this.#timeBetweenChunks
    }

    get llmRequestStartTime(): number {
        return this.#llmRequestStartTime
    }

    reset(): void {
        this.#timeToFirstChunk = -1
        this.#timeBetweenChunks = []
        this.#lastChunkTime = 0
    }
}
