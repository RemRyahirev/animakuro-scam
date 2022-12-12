import { ValidatePassword } from './validate-password';
import { compare } from '../../../../common/utils/password.util';
import { hashSync } from 'bcrypt';

describe('Check passwords', () => {
    const next = 'someNew';
    const current = 'someNew';
    const sourcePassword = 'password';
    const hashedSourcePassword = hashSync(sourcePassword, 7);

    test('If src password is ok', async () => {
        const pwd = new ValidatePassword(
            { next: 'newPass', current: 'password' },
            hashedSourcePassword,
        );
        await pwd.validate();
        const check = await compare('newPass', pwd.value || '');
        expect(check).toEqual(true);
    });

    test('If src password is undefined', async () => {
        const pwd = new ValidatePassword({ next, current }, undefined);
        await pwd.validate();
        const check = await compare(current, pwd.value || '');
        expect(check).toEqual(true);
    });

    test('If next password is undefined', async () => {
        const pwd = new ValidatePassword(
            { next: undefined, current },
            hashedSourcePassword,
        );
        await pwd.validate();
        const changedPassword = await compare(current, pwd.value || '');
        expect(changedPassword).toEqual(false);
        const oldPassword = await compare(sourcePassword, pwd.value || '');
        expect(oldPassword).toEqual(true);
    });

    test('If previous password is undefined', async () => {
        const pwd = new ValidatePassword(
            { next, current: undefined },
            hashedSourcePassword,
        );
        await pwd.validate();
        const changedPassword = await compare(current, pwd.value || '');
        expect(changedPassword).toEqual(false);
        const oldPassword = await compare(sourcePassword, pwd.value || '');
        expect(oldPassword).toEqual(true);
    });

    test('If previous password and next password is undefined', async () => {
        const pwd = new ValidatePassword(
            { next: undefined, current: undefined },
            hashedSourcePassword,
        );
        await pwd.validate();
        const changedPassword = await compare(current, pwd.value || '');
        expect(changedPassword).toEqual(false);
        const oldPassword = await compare(sourcePassword, pwd.value || '');
        expect(oldPassword).toEqual(true);
    });

    test('If previous password and next password are the same', async () => {
        const pwd = new ValidatePassword(
            { next: '123', current: '123' },
            hashedSourcePassword,
        );
        await pwd.validate();
        const changedPassword = await compare(current, pwd.value || '');
        expect(changedPassword).toEqual(false);
        const oldPassword = await compare(sourcePassword, pwd.value || '');
        expect(oldPassword).toEqual(true);
    });

    test('If previous password and source are differ', async () => {
        const pwd = new ValidatePassword(
            { next: 'someNew', current: 'some' },
            hashedSourcePassword,
        );
        await pwd.validate();
        const changedPassword = await compare(current, pwd.value || '');
        expect(changedPassword).toEqual(false);
        const oldPassword = await compare(sourcePassword, pwd.value || '');
        expect(oldPassword).toEqual(true);
    });

    test('If all good', async () => {
        const pwd = new ValidatePassword(
            { next, current: sourcePassword },
            hashedSourcePassword,
        );
        await pwd.validate();
        const changedPassword = await compare(current, pwd.value || '');
        expect(changedPassword).toEqual(true);
        const oldPassword = await compare(sourcePassword, pwd.value || '');
        expect(oldPassword).toEqual(false);
    });
});
