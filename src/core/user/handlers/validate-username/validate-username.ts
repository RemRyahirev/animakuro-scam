import { Checker } from '../checker';
import { PrismaService } from "../../../../common/services";

export class ValidateUsername extends Checker<
    string | undefined,
    string | undefined,
    string | undefined
> {
    private _currentValue: string | undefined;

    constructor(
        private prisma: PrismaService,
        inputValue: string | undefined,
        sourceValue: string | undefined,
    ) {
        super(inputValue, sourceValue);
        this._currentValue = sourceValue;
    }

    get value(): string | undefined {
        return this._currentValue;
    }

    async validate(): Promise<void> {
        if (!this._inputValue) return;

        if (this._inputValue === this._sourceValue) {
            this._errorsList.push({
                property: 'username',
                reasons: ['Username must differ from current'],
            });
            return;
        }
        const user = await this.prisma.user.findFirst({
            where: { username: this._inputValue },
        });
        if (user) {
            this._errorsList.push({
                property: 'username',
                reasons: ['Username already used'],
            });
            return;
        }

        this._currentValue = this._inputValue;
    }
}
