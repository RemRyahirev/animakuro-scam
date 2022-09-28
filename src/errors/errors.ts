import { _errorRegistry } from './rgistry'

export class ApiError extends Error {
    readonly identifier: string
    readonly description?: string
    readonly data?: any

    constructor(identifier: string, description?: string, data?: any) {
        super(identifier)
        this.identifier = identifier
        this.description = description
        this.data = data
    }

    public export() {
        return {
            identifier: this.identifier,
            description: this.description || this.identifier,
            ...(this.data ? this.data : {})
        }
    }
}

for (const entry of Object.entries(_errorRegistry)) {
    _errorRegistry[entry[0]] = entry[1].bind(entry[1])
}

export const errors = Object.freeze(_errorRegistry)
