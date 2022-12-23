import { ValidateUsername } from './validate-username';
import { Redis } from '../../../../loaders';

describe('Check usernames', () => {
    const sourceUsername = 'srcUsername';
    const inputUsername = 'inputUsername';
    test('if source username is undefined', async () => {
        new Redis().logic;

        const user = new ValidateUsername(inputUsername, undefined);
        await user.validate();
        expect(user.value).toBe(inputUsername);
    });

    test('if input username is undefined', async () => {
        const user = new ValidateUsername(undefined, sourceUsername);
        await user.validate();
        expect(user.value).toBe(sourceUsername);
    });

    test('if input username and source username are the same', async () => {
        const user = new ValidateUsername(sourceUsername, sourceUsername);
        await user.validate();
        expect(user.errorsList[0]).toMatchObject({
            property: 'username',
            reasons: ['Username must differ from current'],
        });
    });

    test('if input username and source username are undefined', async () => {
        const user = new ValidateUsername(undefined, undefined);
        await user.validate();
        expect(user.value).toBe(undefined);
    });
});
