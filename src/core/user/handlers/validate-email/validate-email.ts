import { Checker } from '../checker';
import { ErrorObjectInterface } from '../../types/error-object.interface';
import Database from '../../../../database';
import Redis from '../../../../loaders/redis';
import { randomUUID } from 'crypto';
import { Mailer } from '../../../../common/utils/mailer';

import { User } from '../../schemas/user.schema';

export class ValidateEmail extends Checker<
    User,
    string | undefined,
    string | undefined
> {
    private _currentValue: string | undefined;
    private readonly prisma = Database.getInstance().logic;
    private readonly redis = Redis.getInstance().logic;
    private readonly mailer = new Mailer();
    private readonly _isProduction: boolean;

    constructor(
        inputValue: string | undefined,
        sourceValue: User,
        errorsList: Array<ErrorObjectInterface>,
        _isProduction = false,
    ) {
        super(inputValue, sourceValue, errorsList);
        this._currentValue = this._sourceValue.email;
        this._isProduction = _isProduction;
    }

    get value(): string | undefined {
        return this._currentValue;
    }

    async validate(): Promise<void> {
        if (!this._inputValue) return;

        if (this._inputValue === this._sourceValue.email) {
            this._errorsList.push({
                property: 'email',
                reasons: ['Email must differ from current'],
            });
            return;
        }
        const userToChange = await this.prisma.user.findFirst({
            where: { email: this._inputValue },
        });
        if (userToChange) {
            this._errorsList.push({
                property: 'email',
                reasons: ['Email already used'],
            });
            return;
        }
        this._currentValue = this._inputValue;
        if (this._isProduction) {
            const code = randomUUID();
            await this.redis.set(
                `confirmation:change-email:${code}`,
                JSON.stringify({
                    id: this._sourceValue.id,
                    email: this._inputValue,
                }),
                {
                    EX: 300,
                },
            );

            const info = await this.mailer.changeConfirmationMail({
                receiverEmail: this._sourceValue.email || '',
                code,
                newEmail: this._inputValue,
            });
        }
    }
}
