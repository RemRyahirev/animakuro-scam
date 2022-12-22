import { PrismaClient } from '@prisma/client';
import { CharacterType } from '../../common/models/enums';
import { CharacterRole } from '../../common/models/enums';

//const prisma = new PrismaClient();

export async function characterSeed(prisma: PrismaClient) {
    console.log(`Start seeding characters...`);
    await prisma.character.createMany({
        skipDuplicates: true,
        data: [
            {
                bucket_id: 'f2c57902-3981-406b-a9e6-1f15a62019a1',
                character_name: 'Сикакунагай',
                importance: CharacterType.PROTAGONIST,
                role: CharacterRole.MAIN,
                description: 'этот парень был из тех, за кем летает стерх',
            },
            {
                bucket_id: 'f2c57902-3981-406b-a9e6-1f15a62019a1',
                character_name: 'КтоУгодноСан',
                importance: CharacterType.ANTAGONIST,
                role: CharacterRole.BACKGROUND,
                description: 'главный антагонист Сикакунагай',
            },
        ],
    });
    console.log(`Seeding characters finished.`);
}

// перенёс промис в index.ts
// characterSeed()
//     .catch((e) => console.error(e))
//     .finally(async () => await prisma.$disconnect());
