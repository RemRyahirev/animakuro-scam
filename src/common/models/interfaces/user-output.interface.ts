import { Gender } from '../enums/gender.enum';

export interface IUserOutput {
    gender?: Gender | null;
    customGender?: string | null;
    birthday?: Date;
    email?: string;
    username?: string;
    password?: string;
    pass_hash?: string;
}
