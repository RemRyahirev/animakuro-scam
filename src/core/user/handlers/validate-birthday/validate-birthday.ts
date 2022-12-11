import { Checker } from '../checker';
import { compare, hash } from '../../../../common/utils/password.util';
import { PasswordInputInterface } from '../../types/password-input.interface';
import { ErrorObjectInterface } from '../../types/error-object.interface';
import Database from '../../../../database';
import Redis from '../../../../loaders/redis';
import { randomUUID } from 'crypto';
import { Mailer } from '../../../../common/utils/mailer';
import { EmailInputInterface } from '../../types/email-input.interface';
import { User } from '../../schemas/user.schema';

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
