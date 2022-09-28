import {ApiError} from './errors';

export const _errorRegistry = {
    INTERNAL() { return new ApiError(this.name, 'Internal error') },
    AUTH_ERROR(problem: string) { return new ApiError(this.name, `Authorisation error: ${problem}`, { problem }) }
}
