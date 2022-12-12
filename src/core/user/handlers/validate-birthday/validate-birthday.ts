import { Checker } from '../checker';

export class ValidateBirthday extends Checker<
    Date | undefined,
    Date | undefined,
    Date | undefined
> {
    private _currentValue: Date | undefined;

    constructor(inputValue: Date | undefined, sourceValue: Date | undefined) {
        super(inputValue, sourceValue);
        this._currentValue = this._sourceValue;
    }

    get value(): Date | undefined {
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
