import { Checker } from '../checker';
import { GenderInputInterface } from '../../types/gender-input.interface';
import { Gender } from '../../enums/gender.enum';

export class ValidateGender extends Checker<
    GenderInputInterface,
    GenderInputInterface,
    GenderInputInterface
> {
    private readonly _currentValue: GenderInputInterface;

    constructor(
        inputValue: GenderInputInterface,
        sourceValue: GenderInputInterface,
    ) {
        super(inputValue, sourceValue);
        this._currentValue = this._sourceValue;
    }

    get value(): GenderInputInterface {
        return this._currentValue;
    }

    async validate(): Promise<void> {
        if (!this._inputValue.gender) return;
        switch (this._inputValue.gender) {
            case Gender.CUSTOM:
                if (!this._inputValue.customGender) {
                    this.errorsList.push({
                        property: 'gender',
                        reasons: [
                            "For 'CUSTOM' u must also specify 'customGender' field",
                        ],
                    });
                    return;
                }
                this._currentValue.customGender = this._inputValue.customGender;
                break;
            default:
                this._currentValue.customGender = null;
                break;
        }
        this._currentValue.gender = this._inputValue.gender;
    }
}
