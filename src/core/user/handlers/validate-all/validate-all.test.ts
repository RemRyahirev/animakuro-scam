import { UpdateUserInputType } from '../../models/inputs/update-user-input.type';
import { User } from '../../models/user.model';
import { Gender } from '../../../../common/models/enums';
import { ValidateAll } from './validate-all';
import loaders from '../../../../loaders';
import { compare, hash } from '../../../../common/utils/password.util';

describe('Check all', () => {
    const inputData = {
        email: 'input@mail.ru',
        password: 'password',
        newPassword: 'newPassword',
        gender: Gender.CUSTOM,
        customGender: 'custom',
        username: 'newUsername',
        birthday: new Date('2022-08-12'),
    } as UpdateUserInputType;
    const userObj = {
        id: '1',
        email: 'old@mail.ru',
        password: 'password',
        birthday: new Date(),
        gender: Gender.UNSPECIFIED,
        customGender: null,
        username: 'username',
    } as User & { password: string };
    test('if all ok', async () => {
        const password = await hash('password');
        userObj.password = password;
        loaders.Redis.getInstance();
        // await new Redis().connect();
        const user = new ValidateAll(userObj, inputData, false);
        const { password: newPass, ...rest } = await user.run();
        expect(rest).toMatchObject({
            email: 'input@mail.ru',
            gender: Gender.CUSTOM,
            customGender: 'custom',
            username: 'newUsername',
            birthday: new Date('2022-08-12'),
        });
        expect(await compare('newPassword', newPass || '')).toBe(true);
    });
});
