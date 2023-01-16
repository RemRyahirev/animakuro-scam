import { PrismaClient } from '@prisma/client';
import {
    FilmRating,
    MediaFormat,
    MediaSource,
    ReleaseStatus,
} from '../../common/models/enums';

const prisma = new PrismaClient();

export const animeData = async () => {
    const genreList = await prisma.genre.findMany();
    const authorList = await prisma.author.findMany();
    const characterList = await prisma.character.findMany();
    if (!genreList.length || !authorList.length || !characterList.length) {
        throw new Error(
            'Genre, author or character table is empty or not available',
        );
    }
    return [
        {
            id: '1484d58b-bd26-4fed-99a0-d0ba53da3827',
            title: 'Гуррен-лаганн',
            country_of_origin: 'JP',
            score: 4.7,
            year: 2010,
            genres: {
                connect: [
                    {
                        id: genreList[0].id,
                    },
                ],
            },
            format: MediaFormat.OTHER,
            source: MediaSource.OTHER,
            is_licensed: true,
            studios: {
                connect: [
                    {
                        id: 'ac9ab0e3-2d72-4e7c-9255-d1a20e49b113',
                    },
                ],
            },
            seasons_count: 3,
            episodes: 6,
            duration: 13000,
            next_episode: new Date('2023-8-19 10:23:54'),
            rating: FilmRating.R,
            description: 'аниме про лагман',
            preview_link: 'https://google.com',
            status_description: 'в 2006-2007гг',
            release_status: ReleaseStatus.COMPLETED,
            characters: {
                connect: [
                    {
                        id: characterList[0].id,
                    },
                ],
            },
            authors: {
                connect: [
                    {
                        id: authorList[0].id,
                    },
                    {
                        id: authorList[1].id,
                    },
                ],
            },
        },
        {
            id: 'f2d82632-d15d-496f-a45b-dd57b1297f6e',
            title: 'Стальной алхимик',
            country_of_origin: 'JP',
            score: 6.9,
            year: 1999,
            genres: {
                connect: [
                    {
                        id: genreList[1].id,
                    },
                    {
                        id: genreList[2].id,
                    },
                ],
            },
            format: MediaFormat.MOVIE,
            source: MediaSource.GAME,
            is_licensed: true,
            studios: {
                connect: [
                    {
                        id: 'ac9ab0e3-2d72-4e7c-9255-d1a20e49b113',
                    },
                ],
            },
            seasons_count: 1,
            episodes: 10,
            duration: 22000,
            next_episode: new Date('2023-9-19 10:23:54'),
            rating: FilmRating.R,
            description: 'про малыша в доспехах',
            preview_link: 'https://yandex.com',
            status_description: 'в 1999-2001 гг',
            release_status: ReleaseStatus.COMPLETED,
            characters: {
                connect: [
                    {
                        id: characterList[1].id,
                    },
                ],
            },
            authors: {
                connect: [
                    {
                        id: authorList[2].id,
                    },
                ],
            },
        },
        {
            id: '1033dd1c-2401-402a-afd2-858e78eb7475',
            title: 'Стальной охотник',
            country_of_origin: 'JP',
            score: 9.1,
            year: 2016,
            genres: {
                connect: [
                    {
                        id: genreList[3].id,
                    },
                    {
                        id: genreList[4].id,
                    },
                    {
                        id: genreList[5].id,
                    },
                ],
            },
            format: MediaFormat.SPECIAL,
            source: MediaSource.LIGHT_NOVEL,
            is_licensed: false,
            studios: {
                connect: [
                    {
                        id: '9acd2bf7-6fcf-4648-bd03-5e6dbf68a244',
                    },
                ],
            },
            seasons_count: 1,
            episodes: 10,
            duration: 12075,
            next_episode: new Date('2023-10-19 10:23:54'),
            rating: FilmRating.R,
            description: 'про охотника',
            preview_link: 'https://icloud.com',
            status_description: 'в 2015-2016 гг',
            release_status: ReleaseStatus.COMPLETED,
            characters: {
                connect: [
                    {
                        id: characterList[3].id,
                    },
                    {
                        id: characterList[4].id,
                    },
                ],
            },
            authors: {
                connect: [
                    {
                        id: authorList[3].id,
                    },
                    {
                        id: authorList[4].id,
                    },
                ],
            },
        },
    ];
};
