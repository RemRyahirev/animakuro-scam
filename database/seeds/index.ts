import { PrismaClient } from '@prisma/client';
import { Logger } from '@nestjs/common';

import { deepEqual } from '../../libs/common/src/utils/deep-equal';

import { studioData, studioDependencies } from './studio-data';
import { userData } from './user-data';
import { translationData } from './translation-data';
import { genreData } from './genre-data';
import { characterData } from './character-data';
import { authorData } from './author-data';
import { animeData } from './anime-data';
import { userProfileData } from './user-profile-data';
import { userFoldersData } from './user-folders-data';
import { relatingAnimeData } from './relating-anime';
import { similarAnimeData } from './similar-anime';
import { airingScheduleData } from './airing-schedule';
import { profileSettingsData } from './profile-settings-data';
import { openingEndingData } from './opening-ending';

const prisma = new PrismaClient();

async function seedAll() {
    Logger.log('⬇️️ Start seeding...');
    await userData().then((array) => createEntities(array, 'user'));
    await authorData().then((array) => createEntities(array, 'author'));
    await genreData().then((array) => createEntities(array, 'genre'));
    await characterData().then((array) => createEntities(array, 'character'));
    await translationData().then((array) =>
        createEntities(array, 'translation'),
    );
    await studioData().then((array) => createEntities(array, 'studio'));
    await animeData().then((array) => createEntities(array, 'anime'));
    await studioDependencies().then((array) =>
        createDependencies(array, 'studio'),
    );
    await userProfileData().then((array) =>
        createEntities(array, 'userProfile'),
    );
    await profileSettingsData().then((array) =>
        createEntities(array, 'profileSettings'),
    );
    await userFoldersData().then((array) =>
        createEntities(array, 'userFolder'),
    );
    await relatingAnimeData().then((array) =>
        createEntities(array, 'relatingAnime'),
    );
    await similarAnimeData().then((array) =>
        createEntities(array, 'similarAnime'),
    );
    await airingScheduleData().then((array) =>
        createEntities(array, 'airingSchedule'),
    );
    await openingEndingData().then((array) =>
        createEntities(array, 'openingEnding')
    );
}

async function createEntities<
    T extends Array<any>,
    K extends keyof PrismaClient,
>(entityArray: T, entityName: K): Promise<void> {
    Logger.log(`➡️ Start seeding ${entityName}s...`);
    for (const entity of entityArray) {
        if (!entity.id) {
            if (entity.parent_anime_id) {
                continue;
            } else {
                Logger.log(
                    `ℹ️ Entity id ${entityName} not defined, will be create random`,
                );
                // @ts-ignore
                const createdEntity = await prisma[entityName].create({
                    data: entity as any,
                });
                Logger.log(
                    `✏️ Created ${entityName} with id: ${createdEntity.id}`,
                );
                continue;
            }
        }
        // @ts-ignore
        const existenceEntity = await prisma[entityName].findUnique({
            where: {
                id: entity.id,
            },
        });

        if (deepEqual(existenceEntity, entity)) {
            Logger.log(
                `🔧 Update ${entityName} with id: ${existenceEntity.id} skipped`,
            );
            continue;
        }
        if (existenceEntity) {
            // @ts-ignore
            const updatedEntity = await prisma[entityName].update({
                where: {
                    id: entity.id,
                },
                data: entity as any,
            });
            Logger.log(`🔧 Updated ${entityName} with id: ${updatedEntity.id}`);
        }
        if (!existenceEntity) {
            // @ts-ignore
            const createdEntity = await prisma[entityName].create({
                data: entity as any,
            });
            Logger.log(`✏️ Created ${entityName} with id: ${createdEntity.id}`);
        }
    }
    Logger.log(`✅️ Seeding ${entityName}s finished...`);
}

async function createDependencies<
    T extends Array<any>,
    K extends keyof PrismaClient,
>(dependenciesArray: T, entityName: K) {
    Logger.log(`➡️ Start create dependencies in ${entityName}s...`);
    for (const dependency of dependenciesArray) {
        if (!dependency.id) {
            Logger.log(
                `ℹ️ Entity id in dependency ${entityName}Dependencies not provided. Create dependency skipped`,
            );
            continue;
        }
        // @ts-ignore
        const existenceEntity = await prisma[entityName].findUnique({
            where: {
                id: dependency.id,
            },
        });
        if (existenceEntity) {
            // @ts-ignore
            await prisma[entityName].update({
                where: {
                    id: dependency.id,
                },
                data: {
                    ...dependency,
                },
            });
            Logger.log(
                `🔧 Updated dependency in ${entityName}s with id: ${dependency.id}`,
            );
        }
    }
    Logger.log(`✅️ Create dependencies in ${entityName}s finished...`);
}
seedAll()
    .catch((e) =>
        Logger.error(`❌ Seeding database failed, ${e}`, '', 'Seed', false),
    )
    .finally(async () => {
        await prisma.$disconnect();
        Logger.log('✅️ Seeding database finished...');
    });
