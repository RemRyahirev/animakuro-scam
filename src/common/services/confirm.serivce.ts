import { Config, Database, Redis } from '../../loaders';
import { RedisClientType } from 'redis';
import { PrismaClient } from '@prisma/client';
import { EnumEmailMessageType } from '../types/mail/mail.types';
import { PATHS_AND_PREFIXES } from '../config/constants';
import { generateHash, getFrontendUrl } from '../utils/uills';
import { ConfigParent } from '../config/config';
import { Mailer } from '../utils/mailer';
import { GraphQLError } from 'graphql';
import { UserUtilsService } from '../../core/user/services/user-utils.service';
import { GqlHttpException } from '../errors/errors';

export class ConfirmService {
    private readonly redis: RedisClientType;
    private readonly prisma: PrismaClient;
    private readonly config: ConfigParent;
    private readonly mailer: Mailer;
    private readonly userUtils: UserUtilsService;

    constructor() {
        this.prisma = new Database().logic;
        this.redis = new Redis().logic;
        this.config = new Config().logic;
        this.mailer = new Mailer();
        this.userUtils = new UserUtilsService();
    }

    emailServiceTS(url: string, type: EnumEmailMessageType) {
        switch (type) {
            case 0: {
                return {
                    title: `Подтверждение email`,
                    message: `Чтобы подтвердить свою электронную почту, перейдите по <a href="${url}" target="_blank">ссылке</a>.`,
                };
            }
            case 1: {
                return {
                    title: `Подтверждение пароля`,
                    message: `Чтобы подтвердить свой пароль, перейдите по <a href="${url}" target="_blank">ссылке</a>.`,
                };
            }
            default: {
                return {
                    title: 'Неотвечайте',
                    message: 'Это письмо пришло ошибкой',
                };
            }
        }
    }

    getRedisCode(hash: string, type: EnumEmailMessageType) {
        return `${PATHS_AND_PREFIXES[type].redisPrefix}:${hash}`;
    }

    async setHash<T>(obj: T, type: EnumEmailMessageType): Promise<string> {
        const hash = generateHash();
        const EX = this.config.get('CONFIRM_CODE_EXPIRES', 9999);
        const redisCode = this.getRedisCode(hash, type);
        await this.redis.set(redisCode, obj as string | number, { EX });
        return hash;
    }

    async sendLetter(hash: string, email: string, type: EnumEmailMessageType) {
        const url = getFrontendUrl({
            pathname: PATHS_AND_PREFIXES[type].path + hash,
        });
        const text = this.emailServiceTS(url, type);
        return await this.mailer.sendToMail({
            to: email,
            html: text.message,
            subject: text.title,
        });
    }

    public async confirmPassword(hash: string, password: string) {
        const key = this.getRedisCode(
            hash,
            EnumEmailMessageType.RESET_PASSWORD,
        );
        const res = (await this.redis.get(key)) || '';
        if (!res) {
            throw new GraphQLError('Срок жизни hash истек');
        }
        const result = JSON.parse(res);
        await this.userUtils.savePassword(result.email, password);
        await this.redis.del(key);
        return true;
    }

    public async confirmEmail(code: string): Promise<boolean> {
        const key = this.getRedisCode(code, EnumEmailMessageType.CONFIRM_EMAIL);
        const res = (await this.redis.get(key)) || '';
        if (!res) {
            throw new GqlHttpException('Срок жизни hash истек', 400);
        }
        const result = JSON.parse(res);
        await this.userUtils.saveEmail(result.oldEmail, result.newEmail);
        await this.redis.del(key);
        await this.sendEmailRegistrationCongrats(result.newEmail);
        return true;
    }

    private async sendEmailRegistrationCongrats(email: string) {
        const title = 'Ваш email подтвержден.';
        const message = `Ваша почта была успешно подтверждена.`;
        return this.mailer.sendToMail({
            to: email,
            subject: title,
            html: message,
        });
    }
}
