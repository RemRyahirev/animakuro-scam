import { ValidateBirthday } from './validate-birthday';

describe('Check emails', () => {
    const inputDate = new Date('2022-12-21');
    const sourceDate = new Date();
    test('if date is greater than now', async () => {
        const inputDate = new Date('2022-12-21');
        const user = new ValidateBirthday(inputDate, sourceDate, []);
        await user.validate();
        expect(user.errorsList[0]).toMatchObject({
            property: 'birthday',
            reasons: ['Wierd date'],
        });
        expect(user.value).toBe(sourceDate);
    });

    test('if date is less than now', async () => {
        const inputDate = new Date('2022-12-06');
        const user = new ValidateBirthday(inputDate, sourceDate, []);
        await user.validate();
        expect(user.value).toBe(inputDate);
    });
});
