import { Gender } from '../enums/gender.enum';

export interface GenderInputInterface {
    gender: Gender | null | undefined;
    customGender: string | null | undefined;
}
