import { Checker } from '../checker';
import { IGenderInput } from '../../../../common/models/interfaces/gender-input.interface';
import { Gender } from '../../../../common/models/enums/gender.enum';

export class ValidateGender extends Checker<
    IGenderInput,
    IGenderInput,
    IGenderInput
> {
    private readonly _currentValue: IGenderInput;

    constructor(
        inputValue: IGenderInput,
        sourceValue: IGenderInput,
    ) {
        super(inputValue, sourceValue);
        this._currentValue = this._sourceValue;
    }

    get value(): IGenderInput {
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
