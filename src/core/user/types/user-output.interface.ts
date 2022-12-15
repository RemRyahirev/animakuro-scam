import { Gender } from '../../../common/models/enums/gender.enum';

export interface UserOutputInterface {
    gender?: Gender | null;
    customGender?: string | null;
    birthday?: Date;
    email?: string;
    username?: string;
    password?: string;
    pass_hash?: string;
}
