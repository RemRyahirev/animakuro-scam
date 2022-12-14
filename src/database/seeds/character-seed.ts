import { PrismaClient } from '@prisma/client';
import { CharacterType} from "../../core/anime/types/character-type.enum";

const prisma = new PrismaClient();

async function characterSeed() {
    console.log(`Start seeding characters...`);
    await prisma.character.createMany({
        skipDuplicates: true,
        data: [
            {
                bucket_id: 'f2c57902-3981-406b-a9e6-1f15a62019a1',
                character_name: 'Сикакунагай',
                importance: CharacterType.PROTAGONIST,
                description: 'этот парень был из тех, за кем летает стерх'
            },
            {
                bucket_id: 'f2c57902-3981-406b-a9e6-1f15a62019a1',
                character_name: 'КтоУгодноСан',
                importance: CharacterType.ANTAGONIST,
                description: 'главный антагонист Сикакунагай'
            },
        ],
    });
    console.log(`Seeding characters finished.`);
}

characterSeed()
    .catch((e) => console.error(e))
    .finally(async () => await prisma.$disconnect());
