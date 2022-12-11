import { Checker } from '../checker';
import { compare, hash } from '../../../../common/utils/password.util';
import { PasswordInputInterface } from '../../types/password-input.interface';
import { ErrorObjectInterface } from '../../types/error-object.interface';

export class ValidatePassword extends Checker<
    string | undefined,
    PasswordInputInterface,
    string | undefined
> {
    private _currentValue: string | undefined;

    constructor(
        inputValue: PasswordInputInterface,
        sourceValue: string | undefined,
        errorsList: Array<ErrorObjectInterface>,
    ) {
        super(inputValue, sourceValue, errorsList);
        this._currentValue = sourceValue;
    }

    get value(): string | undefined {
        return this._currentValue;
    }

    async validate(): Promise<void> {
        if (!this._sourceValue) {
            this._currentValue = await hash(this._inputValue.next || '');
            return;
        }
        const isNotNull = this._inputValue.current || this._inputValue.next;
        if (!isNotNull) return;
        const errorsList: string[] = [];
        if (!this._inputValue.current)
            errorsList.push("Field 'password' was not specified");

        if (!this._inputValue.next)
            errorsList.push(
                "Field must be specified in pair with 'newPassword'",
            );

        if (this._inputValue.current === this._inputValue.next) {
            errorsList.push("Fields 'password' and 'newPassword' must differ");
            return;
        }
        const passWordsCond = await compare(
            this._inputValue.current || '',
            this._sourceValue,
        );
        if (!passWordsCond) errorsList.push('Password does not match');

        if (errorsList.length === 0 && this._inputValue.next) {
            this._currentValue = await hash(this._inputValue.next);
            return;
        }
        this._errorsList.push({
            property: 'password',
            reasons: errorsList,
        });
    }
}
