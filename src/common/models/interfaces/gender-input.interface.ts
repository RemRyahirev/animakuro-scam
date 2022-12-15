import { Gender } from '../enums/gender.enum';

export interface IGenderInput {
    gender: Gender | null | undefined;
    customGender: string | null | undefined;
}
