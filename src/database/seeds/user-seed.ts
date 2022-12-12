import { PrismaClient } from '@prisma/client';
import { Gender } from '../../core/user/enums/gender.enum';
import { hash } from "../../common/utils/password.util";

const prisma = new PrismaClient();

async function userSeed() {
    const users = await prisma.user.createMany({
        skipDuplicates: true,
        data: [
            {
                email: 'alexander@mail.ru',
                username: 'Alexander',
                password: await hash('password'),
                gender: Gender.MALE,
            },
            {
                email: 'oleg@icloud.com',
                username: 'Oleg',
                password: await hash('another-password'),
                gender: Gender.MALE,
            },
            {
                email: 'irina@google.com',
                username: 'Irina',
                password: await hash('some-password'),
                gender: Gender.FEMALE,
            },
        ],
    });
    console.log(`Users are seeded -> count -> ` + users.count);
}

userSeed()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
