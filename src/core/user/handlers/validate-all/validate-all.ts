import { User } from '../../schemas/user.schema';
import { UpdateUserInputType } from "../../inputs/update-user-input.type";
import { ErrorObjectInterface } from '../../types/error-object.interface';
import { ValidateBirthday } from '../validate-birthday/validate-birthday';
import { ValidateEmail } from '../validate-email/validate-email';
import { ValidateGender } from '../validate-gender/validate-gender';
import { ValidatePassword } from '../validate-password/validate-password';
import { ValidateUsername } from '../validate-username/validate-username';
import { Checker } from '../checker';
import { GqlHttpException } from '../../../../common/errors/errors';
import { HttpStatus } from '../../../../common/types/enums/http-status.enum';
import { UserOutputInterface } from '../../types/user-output.interface';

export class ValidateAll {
    private readonly _errorsList: Array<ErrorObjectInterface> = [];
    private readonly _validateList: Array<Checker<any, any, any>> = [];
    private readonly _resObject: UserOutputInterface = {};
    private readonly _birthDay: ValidateBirthday;
    private readonly _email: ValidateEmail;
    private readonly _gender: ValidateGender;
    private readonly _password: ValidatePassword;
    private readonly _username: ValidateUsername;

    constructor(
        user: User & { password: string | null },
        data: UpdateUserInputType,
        isProduction: boolean,
    ) {
        this._birthDay = new ValidateBirthday(data.birthday, user.birthday);
        this._email = new ValidateEmail(data.email, user, isProduction);
        this._gender = new ValidateGender(
            { gender: data.gender, customGender: data.customGender },
            { gender: user.gender, customGender: user.customGender },
        );
        this._password = new ValidatePassword(
            { next: data.newPassword, current: data.password },
            user.password as string | undefined,
        );
        this._username = new ValidateUsername(data.username, user.username);
        this._validateList.push(
            this._birthDay,
            this._email,
            this._gender,
            this._password,
            this._username,
        );
    }

    private async validateAll(): Promise<Array<void>> {
        return await Promise.all(
            this._validateList.map(async (e) => {
                await e.validate();
                this._errorsList.push(...e.errorsList);
                return;
            }),
        );
    }

    private _setObj() {
        Object.assign(this._resObject, <UserOutputInterface>{
            email: this._email.value,
            username: this._username.value,
            birthday: this._birthDay.value,
            pass_hash: this._password.value,
            customGender: this._gender.value.customGender,
            gender: this._gender.value.gender,
        });
    }

    public async run() {
        await this.validateAll();
        if (this._errorsList.length > 0) {
            console.log(this._errorsList);
            throw new GqlHttpException(
                this._errorsList,
                HttpStatus.BAD_REQUEST,
                'validationErrors',
            );
        }
        this._setObj();
        return this._resObject;
    }
}
