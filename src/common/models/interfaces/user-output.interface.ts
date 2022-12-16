import { Gender } from '../enums';

export interface IUserOutput {
    gender?: Gender | null;
    customGender?: string | null;
    birthday?: Date;
    email?: string;
    username?: string;
    password?: string;
    pass_hash?: string;
}
