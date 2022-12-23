import { PrismaClient } from '@prisma/client';
import { studioData } from './studio-data';
import { userData } from './user-data';
import { translationData } from './translation-data';
import { genreData } from './genre-data';
import { characterData } from './character-data';
import { authorData } from './author-data';

const prisma = new PrismaClient();

async function seedAll() {
    await userData().then((array) => createEntities(array, 'user'));
    await authorData().then((array) => createEntities(array, 'author'));
    await genreData().then((array) => createEntities(array, 'genre'));
    await characterData().then((array) => createEntities(array, 'character'));
    await translationData().then((array) =>
        createEntities(array, 'translation'),
    );
    // await animeData().then((array) => createEntities(array, 'anime'));
    await studioData().then((array) => createEntities(array, 'studio'));
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

function deepEqual(obj1: any, obj2: any): boolean {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
}

seedAll()
    .catch(console.error)
    .finally(async () => {
        await prisma.$disconnect();
        console.log('Seeding database finished...');
    });
