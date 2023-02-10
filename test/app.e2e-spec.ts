import * as pactum from 'pactum';
import { useContainer } from '@nestjs/class-validator';
import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { Prisma } from '@prisma/client';

import { CommonModule } from 'common/common.module';
import { PrismaClientExceptionFilter } from 'common/filters/prisma-exception.filter';
import { ValidationExceptionFilter } from 'common/filters/validation-exception.filter';
import { PaginationService } from 'common/services/pagination.service';
import { PrismaService } from 'common/services/prisma.service';
import { exceptionFactory } from 'common/utils/error-formatter.util';

import { AppModule } from "../src/app.module";

describe('gql', () => {
    let app: INestApplication;
    let url: string;
    const path = '/graphql';

    const prismaService = {
        anime: {
            findMany: jest.fn().mockName('PrismaService.anime.findMany'),
        },
        airingSchedule: {
            findMany: jest.fn().mockName('PrismaService.airingSchedule.findMany'),
        },
    };
    const paginationService = {
        getPagination: jest.fn().mockName('PaginationService.getPagination'),
    };

    beforeAll(async () => {
        const appModuleRef = await Test.createTestingModule({
            imports: [AppModule],
        })
            .overrideProvider(PrismaService)
            .useValue(prismaService)
            .overrideProvider(PaginationService)
            .useValue(paginationService)
            .compile();

        app = appModuleRef.createNestApplication();

        // init part from app.ts
        const globalPrefix = 'graphql';
        useContainer(app.select(CommonModule), {
            fallback: true,
            fallbackOnErrors: true,
        });
        app.setGlobalPrefix(globalPrefix, {
            exclude: [
                'oauth/google',
                'oauth/google/redirect',
                'oauth/apple',
                'oauth/apple/redirect',
                'oauth/facebook',
                'oauth/facebook/redirect',
                'oauth/apple',
                'oauth/apple/redirect',
            ],
        });
        app.useGlobalFilters(new PrismaClientExceptionFilter());
        app.useGlobalFilters(new ValidationExceptionFilter());
        app.useGlobalPipes(
            new ValidationPipe({
                whitelist: true,
                transform: true,
                exceptionFactory,
            }),
        );
        // init end

        await app.listen(0);
        url = await app.getUrl();
        pactum.request.setBaseUrl(url.replace('[::1]', 'localhost'));
    });

    afterAll(async () => {
        await app.close();
    });

    beforeEach(async () => {
        jest.spyOn(Logger, 'error').mockImplementation();
    });

    afterEach(async () => {
        jest.clearAllMocks();
    });

    describe('anime', () => {
        it('arguments validation error', () => {
            return pactum
                .spec()
                .post(path)
                .withGraphQLQuery(
                    `query animeList {
                        animeQueries {
                            getAnimeList(page: 0, perPage: 0) {
                                success
                                anime_list {
                                    id
                                }
                            }
                        }
                    }`
                )
                .expectStatus(200)
                .expectBody({
                    errors: [
                        {
                            message: 'Parameter validation error',
                            location: {
                                line: 3,
                                column: 29,
                            },
                            path: 'animeQueries.getAnimeList',
                            code: 'BAD_USER_INPUT',
                            details: [
                                'page must be a positive number',
                                'perPage must be a positive number',
                            ],
                        },
                    ],
                    data: null,
                });
        });

        it('query validation error', () => {
            return pactum
                .spec()
                .post(path)
                .withGraphQLQuery(
                    `query animeList {
                        animeQueries {
                            getAnimeList(page: 0, perPage: 0) {
                                success
                                anime_list
                                    id
                                }
                            }
                        }
                    }`
                )
                .expectStatus(400)
                .expectBody({
                    errors: [
                        {
                            message: 'Syntax Error: Unexpected \'}\'.',
                            location: {
                                line: 10,
                                column: 21,
                            },
                            code: 'GRAPHQL_PARSE_FAILED',
                        },
                    ],
                });
        });

        it('prisma server error', () => {
            prismaService.anime.findMany.mockRejectedValue(new Prisma.PrismaClientKnownRequestError(
                'Invalid `this.prisma.anime.findMany()` invocation in...',
                {
                    code: 'P2022',
                    clientVersion: '4.8.1',
                    meta: { column: 'anime.title' },
                    batchRequestIdx: undefined
                },
            ));

            return pactum
                .spec()
                .post(path)
                .withGraphQLQuery(
                    `query animeList {
                        animeQueries {
                            getAnimeList(page: 1, perPage: 5) {
                                success
                                anime_list {
                                    id
                                }
                            }
                        }
                    }`
                )
                .expectStatus(200)
                .expectBody({
                    errors: [
                        {
                            message: 'Something went wrong with DB communication.',
                            location: {
                                line: 3,
                                column: 29,
                            },
                            path: 'animeQueries.getAnimeList',
                            code: 'INTERNAL_SERVER_ERROR',
                        },
                    ],
                    data: null,
                });
        });

        it('graphql error on empty data', () => {
            prismaService.anime.findMany.mockResolvedValue([{
                id: '5318851d-3348-4cf7-81a9-b08ccf505796',
                title: 'Детектив Конан: Черная железная рыба-тень',
                score: 0,
                year: 2023,
                date_start: new Date('2023-04-14T00:00:00.000Z'),
                date_end: null,
                country_of_origin: 'JP',
                format: 'MOVIE',
                source: 'ORIGINAL',
                season: 'SPRING',
                type: 'ANIME',
                hashtags: [ '#劇場版名探偵コナン', '#黒鉄の魚影' ],
                synonyms: [
                    'Detective Conan 2023',
                    '名探偵コナン2023',
                    'Detective Conan Movie 26',
                    '名探偵コナン 黒鉄の魚影（サブマリン',
                    'Meitantei Conan: Kurogane no Gyoei'
                ],
                is_licensed: true,
                seasons_count: 26,
                episodes: 1,
                duration: 0,
                next_episode: new Date('2023-12-31T00:00:00.000Z'),
                rating: 'NC_17',
                description: '26-ой фильм о детективе Конане. Премьера состоится во время золотой недели 2023',
                preview_link: 'https://konan-detective.com',
                status_description: 'в 2023-2023 гг',
                release_status: 'NOT_YET_RELEASED',
                created_at: new Date('2023-02-07T14:34:14.282Z'),
                updated_at: new Date('2023-02-07T14:34:14.282Z'),
                genres: [],
                authors: [],
                characters: [],
                studios: [],
                related_by_animes: [],
                similar_by_animes: [],
                airing_schedule: [{}]
            }]);
            paginationService.getPagination.mockResolvedValue({
                page: 1,
                perPage: 1,
                totalCount: 1,
                pageCount: 1,
            });

            return pactum
                .spec()
                .post(path)
                .withGraphQLQuery(
                    `query animeList {
                        animeQueries {
                            getAnimeList(page: 1, perPage: 1) {
                                success
                                anime_list {
                                    id
                                    airing_schedule {
                                        anime {
                                            title
                                        }
                                    }
                                }
                            }
                        }
                    }`
                )
                .expectStatus(200)
                .expectBody({
                    errors: [
                        {
                            message: 'Something went wrong with DB communication.',
                            location: {
                                line: 8,
                                column: 41,
                            },
                            path: 'animeQueries.getAnimeList.anime_list.0.airing_schedule.0.anime',
                            code: 'INTERNAL_SERVER_ERROR',
                        },
                    ],
                    data: {
                        animeQueries: {
                            getAnimeList: {
                                anime_list: [
                                    {
                                        airing_schedule: null,
                                        id: '5318851d-3348-4cf7-81a9-b08ccf505796'
                                    }
                                ],
                                success: true,
                            },
                        },
                    },
                });
        });
    })
});
