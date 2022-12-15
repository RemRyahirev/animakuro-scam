import { ValidateEmail } from './validate-email';
import { User } from '../../models/user.model';

describe('Check emails', () => {
    const inputEmail = 'input@mail.ru';
    const userElem = { email: 'some@mail.ru', id: 1 } as any as User;
    test('if source email is undefined', async () => {
        const userElem = { email: undefined, id: 1 } as any as User;
        const user = new ValidateEmail(inputEmail, userElem);
        await user.validate();
        expect(user.value).toBe(inputEmail);
    });

    test('if input email is undefined', async () => {
        const user = new ValidateEmail(undefined, userElem);
        await user.validate();
        expect(user.value).toBe(userElem.email);
    });

    test('if input email are the same as source name', async () => {
        const user = new ValidateEmail('some@mail.ru', userElem);
        await user.validate();
        expect(user.errorsList[0]).toMatchObject({
            property: 'email',
            reasons: ['Email must differ from current'],
        });
        expect(user.value).toBe(userElem.email);
    });

    test('if input email are the same as source diffs', async () => {
        const user = new ValidateEmail('input@mail.ru', {
            id: '3',
            email: 'old@mail.ru',
        } as User);
        await user.validate();
        expect(user.value).toBe('input@mail.ru');
    });
});
