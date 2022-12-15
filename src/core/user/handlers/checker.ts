import { IErrorObject } from '../../../common/models/interfaces';

export abstract class Checker<S, I, C> {
    protected readonly _sourceValue: S;
    protected readonly _inputValue: I;
    protected readonly _errorsList: Array<IErrorObject> = [];

    protected constructor(inputValue: I, sourceValue: S) {
        this._inputValue = inputValue;
        this._sourceValue = sourceValue;
    }

    abstract validate(): Promise<void>;

    get errorsList(): Array<IErrorObject> {
        return this._errorsList;
    }

    abstract get value(): C;
}
