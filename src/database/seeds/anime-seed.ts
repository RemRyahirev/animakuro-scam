import { PrismaClient } from '@prisma/client';
import { MediaFormat } from '../../core/anime/types/media-format.enum';
import { MediaSource } from '../../core/anime/types/media-source.enum';
import { FilmRating } from '../../core/anime/types/film-rating.enum';
import { ReleaseStatus } from '../../core/anime/types/release-status.enum';

const prisma = new PrismaClient();

async function animeSeed() {
    console.log(`Start seeding anime...`);
    await prisma.anime.createMany({
        skipDuplicates: true,
        data: [
            {
                id: 'eae8238a-7aec-11ed-a453-020017000b7b',
                title: 'Гуррен-лаганн',
                score: 4.7,
                year: 2010,
                genres: [],
                media_format: MediaFormat.OTHER,
                source: MediaSource.OTHER,
                studio_id: 'ac9ab0e3-2d72-4e7c-9255-d1a20e49b113',
                seasons_count: 3,
                episodes_count: 6,
                duration: 13000,
                next_episode: new Date('2004-10-19 10:23:54'),
                rating: FilmRating.R,
                description: 'аниме про лагман',
                preview_link: 'https://google.com',
                status_description: 'в 2006-2007гг',
                release_status: ReleaseStatus.FINISHED,
                characters: [],
                authors: [],
            },
            {
                id: 'eae825a6-7aec-11ed-a453-020017000b7b',
                title: 'Стальной алхимик',
                score: 6.9,
                year: 1999,
                genres: [],
                media_format: MediaFormat.MOVIE,
                source: MediaSource.GAME,
                studio_id: 'ac9ab0e3-2d72-4e7c-9255-d1a20e49b113',
                seasons_count: 1,
                episodes_count: 10,
                duration: 22000,
                next_episode: new Date('2020-10-19 10:23:54'),
                rating: FilmRating.R,
                description: 'про малыша в доспехах',
                preview_link: 'https://yandex.com',
                status_description: 'в 1999-2001 гг',
                release_status: ReleaseStatus.FINISHED,
                characters: [],
                authors: [],
            },
        ],
    });
    console.log(`Seeding anime finished.`);
}

animeSeed()
    .catch((e) => console.error(e))
    .finally(async () => await prisma.$disconnect());
