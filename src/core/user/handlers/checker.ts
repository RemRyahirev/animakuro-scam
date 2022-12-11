import { ErrorObjectInterface } from '../types/error-object.interface';

export abstract class Checker<T, D> {
    protected readonly _sourceValue: T;
    protected _currentValue: T;
    protected readonly _inputValue: D;
    protected readonly _errorsList: Array<ErrorObjectInterface>;

    protected constructor(
        inputValue: D,
        sourceValue: T,
        errorsList: Array<ErrorObjectInterface>,
    ) {
        this._currentValue = sourceValue;
        this._inputValue = inputValue;
        this._sourceValue = sourceValue;
        this._errorsList = errorsList;
    }

    abstract validate(): Promise<void>;

    abstract get value(): T;
}
