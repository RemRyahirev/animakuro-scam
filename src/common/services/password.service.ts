import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { APP_CONSTANTS } from '../../app.constants';

@Injectable()
export class PasswordService {
    public async encrypt(password: string): Promise<string> {
        return await hash(password, APP_CONSTANTS.pass_hash_salt);
    }

    public async compare(password: string, hash: string): Promise<boolean> {
        return await compare(password, hash);
    }
}
