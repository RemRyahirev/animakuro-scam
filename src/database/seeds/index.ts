// export * from './user-seed';
// export * from './genre-seed';
// export * from './author-seed';
// export * from './character-seed';
// export * from './studio-seed';
// export * from './anime-seed';
// export * from './translation-seed';
// export * from './user-profile-seed';
// export * from './user-anime-seed';

import {PrismaClient} from "@prisma/client";
const prisma = new PrismaClient();

import {userSeed} from './user-seed';
import {animeSeed} from './anime-seed';
import {genreSeed} from './genre-seed';
import {authorSeed} from './author-seed';
import {characterSeed} from './character-seed';
import {studioSeed} from './studio-seed';
import {translationSeed} from './translation-seed';
import {userProfileSeed} from './user-profile-seed';
import {userAnimeSeed} from './user-anime-seed';

async function seedAll(){
    await userSeed(prisma);
    await genreSeed(prisma);
    await authorSeed(prisma);
    await characterSeed(prisma);
    await studioSeed(prisma);
    await animeSeed(prisma);
    await translationSeed(prisma);
    await userProfileSeed(prisma);
    setTimeout(async () => {
        console.log('Waiting before anime table is created');
        await userAnimeSeed(prisma);
    }, 1000);
}

seedAll()
    .catch((e) => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
        console.log(
            '--------------------------\n ' +
            'If you caught an Error, \n report me in Discord: #4745 ' +
            '\n--------------------------')
    });
