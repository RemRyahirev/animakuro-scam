import { Gender } from '../enums';

export interface IGenderInput {
    gender: Gender | null | undefined;
    customGender: string | null | undefined;
}
