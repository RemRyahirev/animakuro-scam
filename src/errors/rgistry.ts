import {ApiError} from './errors';

export const _errorRegistry = {
    INTERNAL() { return new ApiError(this.name, 'Internal error') },
    VALIDATION(problems: { property: string, reasons: string[] }[]) { return new ApiError(this.name, 'Failed to pass schema validation', { problems }) },
    AUTH_ERROR(problem: string) { return new ApiError(this.name, `Authorisation error: ${problem}`, { problem }) }
}
