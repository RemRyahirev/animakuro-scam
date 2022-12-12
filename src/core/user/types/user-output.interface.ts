import { Gender } from '../enums/gender.enum';

export interface UserOutputInterface {
    gender?: Gender | null;
    customGender?: string | null;
    birthday?: Date;
    email?: string;
    username?: string;
    password?: string;
}
