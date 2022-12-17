import { Checker } from '../checker';
import { Database, Redis } from '../../../../loaders';
import { randomUUID } from 'crypto';
import { Mailer } from '../../../../common/utils/mailer';
import { User } from '../../models/user.model';
import { RedisClientType } from 'redis';

export class ValidateEmail extends Checker<
    User,
    string | undefined,
    string | undefined
> {
    private _currentValue: string | undefined;
    private readonly prisma = new Database().logic;
    private redis: RedisClientType | undefined;
    private readonly mailer = new Mailer();
    private readonly _isProduction: boolean;

    constructor(
        inputValue: string | undefined,
        sourceValue: User,
        _isProduction = false,
    ) {
        super(inputValue, sourceValue);
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
            this.redis = new Redis().logic;
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
