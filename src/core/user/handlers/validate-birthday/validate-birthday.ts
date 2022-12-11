import { Checker } from '../checker';
import { ErrorObjectInterface } from '../../types/error-object.interface';

export class ValidateBirthday extends Checker<Date, Date, Date> {
    private _currentValue: Date;

    constructor(
        inputValue: Date,
        sourceValue: Date,
        errorsList: Array<ErrorObjectInterface>,
    ) {
        super(inputValue, sourceValue, errorsList);
        this._currentValue = this._sourceValue;
    }

    get value(): Date {
        return this._currentValue;
    }

    async validate(): Promise<void> {
        if (!this._inputValue) return;
        if (this._inputValue.getTime() > Date.now()) {
            this._errorsList.push({
                property: 'birthday',
                reasons: ['Wierd date'],
            });
            return;
        }
        this._currentValue = this._inputValue;
    }
}
