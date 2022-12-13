import { PrismaClient } from '@prisma/client';
import { Gender } from '../../core/user/enums/gender.enum';
import { hash } from "../../common/utils/password.util";

const prisma = new PrismaClient();

async function userSeed() {
    console.log(`Start seeding users...`);
    await prisma.user.createMany({
        skipDuplicates: true,
        data: [
            {
                email: 'alexander@mail.ru',
                username: 'Alexander',
                pass_hash: await hash('password'),
                gender: Gender.MALE,
            },
            {
                email: 'oleg@icloud.com',
                username: 'Oleg',
                pass_hash: await hash('another-password'),
                gender: Gender.MALE,
            },
            {
                email: 'irina@google.com',
                username: 'Irina',
                pass_hash: await hash('some-password'),
                gender: Gender.FEMALE,
            },
        ],
    });
    console.log(`Seeding users finished.`);
}

userSeed()
    .catch((e) => console.error(e))
    .finally(async () => await prisma.$disconnect());
