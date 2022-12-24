import { PrismaClient } from '@prisma/client';
import { studioData, studioDependencies } from "./studio-data";
import { userData } from './user-data';
import { translationData } from './translation-data';
import { genreData } from './genre-data';
import { characterData } from './character-data';
import { authorData } from './author-data';
import { animeData } from './anime-data';
import { deepEqual } from '../../common/utils/deep-equal';

const prisma = new PrismaClient();

async function seedAll() {
    await userData().then((array) => createEntities(array, 'user'));
    await authorData().then((array) => createEntities(array, 'author'));
    await genreData().then((array) => createEntities(array, 'genre'));
    await characterData().then((array) => createEntities(array, 'character'));
    await translationData().then((array) =>
        createEntities(array, 'translation'),
    );
    await studioData().then((array) => createEntities(array, 'studio'));
    await animeData().then((array) => createEntities(array, 'anime'));
    await studioDependencies().then((array) => createDependencies(array, 'studio'));
}

async function createEntities(
    entityArray: any[],
    entityName: string,
): Promise<void> {
    console.log(`Start seeding ${entityName}s...`);
    for (const entity of entityArray) {
        // @ts-ignore
        const existenceEntity = await prisma[entityName].findUnique({
            where: {
                id: entity.id,
            },
        });

        if (deepEqual(existenceEntity, entity)) {
            console.log(
                `Update ${entityName} with id: ${existenceEntity.id} skipped`,
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
            console.log(`Updated ${entityName} with id: ${updatedEntity.id}`);
        }
        if (!existenceEntity) {
            // @ts-ignore
            const createdEntity = await prisma[entityName].create({
                data: entity as any,
            });
            console.log(`Created ${entityName} with id: ${createdEntity.id}`);
        }
    }
    console.log(`Seeding ${entityName}s finished...`);
}

async function createDependencies(
    dependenciesArray: any[],
    entityName: string,
){
    console.log(`Start create dependencies in ${entityName}s...`);
    for (const dependency of dependenciesArray){
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
                    ...dependency
                },
            });
            console.log(`Updated dependency in ${entityName}s with id: ${dependency.id}`);
        }
    }
    console.log(`Create dependencies in ${entityName}s finished...`);
}
seedAll()
    .catch(console.error)
    .finally(async () => {
        await prisma.$disconnect();
        console.log('Seeding database finished...');
    });
