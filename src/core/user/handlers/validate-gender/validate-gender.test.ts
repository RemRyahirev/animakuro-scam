import { GenderInputInterface } from '../../types/gender-input.interface';
import { Gender } from '../../enums/gender.enum';
import { ValidateGender } from './validate-gender';

describe('Check gender', () => {
    const sourceGender: GenderInputInterface = {
        gender: Gender.CUSTOM,
        customGender: 'Some',
    };
    test('if gender is unspecified', async () => {
        const inputGender: GenderInputInterface = {
            gender: Gender.UNSPECIFIED,
            customGender: '312312',
        };
        const user = new ValidateGender(inputGender, sourceGender, []);
        await user.validate();
        expect(user.value).toMatchObject({
            gender: Gender.UNSPECIFIED,
            customGender: null,
        });
    });

    test('if gender is female', async () => {
        const inputGender: GenderInputInterface = {
            gender: Gender.FEMALE,
            customGender: 'ffdsfsdfsd',
        };
        const user = new ValidateGender(inputGender, sourceGender, []);
        await user.validate();
        expect(user.value).toMatchObject({
            gender: Gender.FEMALE,
            customGender: null,
        });
    });

    test('if gender is male', async () => {
        const inputGender: GenderInputInterface = {
            gender: Gender.MALE,
            customGender: 'ffdsfsdfsd',
        };
        const user = new ValidateGender(inputGender, sourceGender, []);
        await user.validate();
        expect(user.value).toMatchObject({
            gender: Gender.MALE,
            customGender: null,
        });
    });

    test('if gender is custom', async () => {
        const inputGender: GenderInputInterface = {
            gender: Gender.CUSTOM,
            customGender: 'custom!!!',
        };
        const user = new ValidateGender(inputGender, sourceGender, []);
        await user.validate();
        expect(user.value).toMatchObject({
            gender: Gender.CUSTOM,
            customGender: 'custom!!!',
        });
    });
});
