import { OpeningEndingType, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const openingEndingData = async () =>{
    const openingEndingList = await prisma.openingEnding.findMany();

    return [
        {
            id: '51630f1a-32d8-4e23-ace2-66ba69a4878a',
            anime_id: '02bfd954-3cf5-47a1-953b-daad7054c6d6',
            type: OpeningEndingType.OPENING,
            url: 'https://www.youtube.com/watch?v=4s7uc_j1Sm0',
            name: 'I love jojo',
            author_name: 'JOJO Fan',
            episode_start: 1,
            episode_end: 4
        },
        {
            id: '7362f7d3-7c4b-4f78-ab54-9a4b8462773b',
            anime_id: '02bfd954-3cf5-47a1-953b-daad7054c6d6',
            type: OpeningEndingType.ENDING,
            url: 'https://www.youtube.com/watch?v=WOxNRbUYd1o',
            name: 'I still love jojo',
            author_name: 'JOJO Fan',
            episode_start: 1,
            episode_end: 4
        },
    ]
}
