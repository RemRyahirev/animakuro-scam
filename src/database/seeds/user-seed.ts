import { PrismaClient } from '@prisma/client';
import { Gender } from '../../common/models/enums';
import { hash } from '../../common/utils/password.util';

const prisma = new PrismaClient();

async function userSeed() {
    console.log(`Start seeding users...`);
    await prisma.user.createMany({
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
    console.log(`Seeding users finished.`);
}

userSeed()
    .catch((e) => console.error(e))
    .finally(async () => await prisma.$disconnect());
