import { Injectable } from '@nestjs/common';
import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import { AnimeType, FolderType } from '@prisma/client';

type UserAction = {
    animeInFavorites: {
        animeId: string;
        userId: string;
    };
    animeRate: {
        animeId: string;
        stars: number;
    };
    animeInFolder: {
        animeId: string;
        userId: string;
        folderId: string;
        folderType: FolderType;
    };
    statFolder: {
        userId: string;
        folderId: string;
        folderType: FolderType;
    };
    animeType: {
        animeId: string;
        animeType: AnimeType;
    };
    animeGenre: {
        animeId: string;
        genreId: string;
    };

    getAnime: {
        animeId: string;
    };
    getCharacter: {
        characterId: string;
    };
    getAuthor: {
        authorId: string;
    };
    getProfile: {
        profileId: string;
    };
    userCollectionRate: {
        collectionId: string;
        stars: number;
    };
    collectionInFavorites: {
        collectionId: string;
        userId: string;
    };
};
enum StatAction {
    animeInFavorites = 'animeInFavorites',
    animeInUserFavorites = 'animeInUserFavorites',
    animeUserRate = 'animeUserRate',
    animeInFolder = 'animeInFolder',
    animeInUserFolder = 'animeInUserFolder',
    statFolder = 'statFolder',
    animeType = 'animeType',
    animeGenre = 'animeGenre',
    getAnime = 'getAnime',
    getCharacter = 'getCharacter',
    getAuthor = 'getAuthor',
    getProfile = 'getProfile',
    userCollectionRate = 'userCollectionRate',
    collectionInFavorites = 'collectionInFavorites',
    collectionInUserFavorites = 'collectionInUserFavorites',
}

const STAT_REDIS_KEY = 'statistic';

const EventCode = {
    animeInFavorites: 'AFav',
    animeInUserFavorites: 'AUFav',
    animeUserRate: 'AUR',
    animeInFolder: 'AIF',
    animeInUserFolder: 'AIUF',
    statFolder: 'SF',
    animeType: 'AT',
    animeGenre: 'AG',
    getAnime: 'GAN',
    getCharacter: 'GCH',
    getAuthor: 'GAU',
    getProfile: 'GPR',
    userCollectionRate: 'UCOR',
    collectionInFavorites: 'CFav',
    collectionInUserFavorites: 'CUFav',
} as const satisfies Record<StatAction, string>;
type EventCodes = typeof EventCode[keyof typeof EventCode];

const Key = {
    animeInFavorites: ({ animeId }: { animeId: string }) =>
        `${EventCode.animeInFavorites}:${animeId}`,
    animeInUserFavorites: ({ userId }: { userId: string }) =>
        `${EventCode.animeInUserFavorites}:${userId}`,
    animeUserRate: ({ animeId, stars }: { animeId: string; stars: number }) =>
        `${EventCode.animeUserRate}:${animeId}:${stars}`,
    animeInFolder: ({ animeId, folderType }: { animeId: string, folderType: FolderType }) =>
        `${EventCode.animeInFolder}:${animeId}:${folderType}`,
    animeInUserFolder: ({ userId, folderId, folderType, animeId }: { userId: string, folderId: string, folderType: FolderType, animeId: string }) =>
        `${EventCode.animeInUserFolder}:${userId}:${folderId}:${folderType}:${animeId}`,
    statFolder: ({ userId, folderId, folderType }: { userId: string, folderId: string, folderType: FolderType }) =>
        `${EventCode.statFolder}:${userId}:${folderId}:${folderType}`,
    animeType: ({ animeId, animeType }: { animeId: string, animeType: AnimeType }) =>
        `${EventCode.animeType}:${animeId}:${animeType}`,
    animeGenre: ({ animeId, genreId }: { animeId: string, genreId: string }) =>
        `${EventCode.animeGenre}:${animeId}:${genreId}`,
    getAnime: ({ animeId }: { animeId: string }) =>
        `${EventCode.getAnime}:${animeId}`,
    getCharacter: ({ characterId }: { characterId: string }) =>
        `${EventCode.getCharacter}:${characterId}`,
    getAuthor: ({ authorId }: { authorId: string }) =>
        `${EventCode.getAuthor}:${authorId}`,
    getProfile: ({ profileId }: { profileId: string }) =>
        `${EventCode.getProfile}:${profileId}`,
    userCollectionRate: ({ collectionId, stars }: { collectionId: string, stars: number }) =>
        `${EventCode.userCollectionRate}:${collectionId}:${stars}`,
    collectionInFavorites: ({ collectionId }: { collectionId: string }) => 
        `${EventCode.collectionInFavorites}:${collectionId}`,
    collectionInUserFavorites: ({ userId }: { userId: string }) =>
        `${EventCode.collectionInUserFavorites}:${userId}`,
} satisfies Record<StatAction, (...args: any[]) => string>;
type ParsedEvent = ({
    [P in StatAction]: {
        event: P;
        params: Parameters<typeof Key[P]>[0];
    };
})[StatAction];

@Injectable()
export class StatisticService {
    constructor(@InjectRedis() protected readonly redis: Redis) { }

    async fireEvent<K extends keyof UserAction>(
        event: K,
        opts: UserAction[K],
        changedBy = 0,
    ) {
        let params;
        switch (event) {
            case 'animeInFavorites':
                params = opts as UserAction['animeInFavorites'];

                await Promise.all([
                    this.redis.zincrby(STAT_REDIS_KEY, changedBy, Key.animeInFavorites(params)),
                    this.redis.zincrby(STAT_REDIS_KEY, changedBy, Key.animeInUserFavorites(params)),
                ]);
                break;

            case 'animeRate':
                params = opts as UserAction['animeRate'];

                await this.redis.zincrby(STAT_REDIS_KEY, changedBy, Key.animeUserRate(params));
                break;

            case 'animeInFolder':
                params = opts as UserAction['animeInFolder'];

                await Promise.all([
                    this.redis.zincrby(STAT_REDIS_KEY, changedBy, Key.animeInFolder(params)),
                    this.redis.zincrby(STAT_REDIS_KEY, changedBy, Key.animeInUserFolder(params)),
                ]);
                break;

            case 'statFolder':
                params = opts as UserAction['statFolder'];

                await this.redis.zadd(STAT_REDIS_KEY, changedBy, Key.statFolder(params));
                break;

            case 'animeType':
                params = opts as UserAction['animeType'];

                await this.redis.zadd(STAT_REDIS_KEY, changedBy, Key.animeType(params));
                break;

            case 'animeGenre':
                params = opts as UserAction['animeGenre'];

                await this.redis.zadd(STAT_REDIS_KEY, changedBy, Key.animeGenre(params));
                break;

            case 'getAnime':
                params = opts as UserAction['getAnime'];

                await this.redis.zincrby(STAT_REDIS_KEY, changedBy, Key.getAnime(params));
                break;

            case 'getCharacter':
                params = opts as UserAction['getCharacter'];

                await this.redis.zincrby(STAT_REDIS_KEY, changedBy, Key.getCharacter(params));
                break;

            case 'getAuthor':
                params = opts as UserAction['getAuthor'];

                await this.redis.zincrby(STAT_REDIS_KEY, changedBy, Key.getAuthor(params));
                break;

            case 'getProfile':
                params = opts as UserAction['getProfile'];

                await this.redis.zincrby(STAT_REDIS_KEY, changedBy, Key.getProfile(params));
                break;

            case 'userCollectionRate':
                params = opts as UserAction['userCollectionRate'];
                await this.redis.zincrby(STAT_REDIS_KEY, changedBy, Key.userCollectionRate(params));
                break;

            case 'collectionInFavorites':
                params = opts as UserAction['collectionInFavorites'];

                await Promise.all([
                    this.redis.zincrby(STAT_REDIS_KEY, changedBy, Key.collectionInFavorites(params)),
                    this.redis.zincrby(STAT_REDIS_KEY, changedBy, Key.collectionInUserFavorites(params)),
                ]);
                break;
            default:
                console.error('Unknown stat event:', event, opts);
        }
    }

    private parseEvent(event: string): ParsedEvent | null {
        const [code, ...params] = event.split(':');

        switch (code as EventCodes) {
            case EventCode.animeInFavorites:
                return {
                    event: StatAction.animeInFavorites,
                    params: {
                        animeId: params[0],
                    },
                };

            case EventCode.animeInUserFavorites:
                return {
                    event: StatAction.animeInUserFavorites,
                    params: {
                        userId: params[0],
                    },
                };

            case EventCode.animeUserRate:
                return {
                    event: StatAction.animeUserRate,
                    params: {
                        animeId: params[0],
                        stars: Number(params[1]),
                    },
                };

            case EventCode.animeInFolder:
                return {
                    event: StatAction.animeInFolder,
                    params: {
                        animeId: params[0],
                        folderType: FolderType[params[1] as keyof typeof FolderType],
                    },
                };

            case EventCode.animeInUserFolder:
                return {
                    event: StatAction.animeInUserFolder,
                    params: {
                        userId: params[0],
                        folderId: params[1],
                        folderType: FolderType[params[2] as keyof typeof FolderType],
                        animeId: params[3],
                    },
                };

            case EventCode.statFolder:
                return {
                    event: StatAction.statFolder,
                    params: {
                        userId: params[0],
                        folderId: params[1],
                        folderType: FolderType[params[2] as keyof typeof FolderType],
                    },
                };

            case EventCode.animeType:
                return {
                    event: StatAction.animeType,
                    params: {
                        animeId: params[0],
                        animeType: AnimeType[params[1] as keyof typeof AnimeType],
                    },
                };

            case EventCode.animeGenre:
                return {
                    event: StatAction.animeGenre,
                    params: {
                        animeId: params[0],
                        genreId: params[1],
                    },
                };

            case EventCode.getAnime:
                return {
                    event: StatAction.getAnime,
                    params: {
                        animeId: params[0],
                    },
                };

            case EventCode.getCharacter:
                return {
                    event: StatAction.getCharacter,
                    params: {
                        characterId: params[0],
                    },
                };

            case EventCode.getAuthor:
                return {
                    event: StatAction.getAuthor,
                    params: {
                        authorId: params[0],
                    },
                };

            case EventCode.getProfile:
                return {
                    event: StatAction.getProfile,
                    params: {
                        profileId: params[0],
                    },
                };
            case EventCode.userCollectionRate:
                return {
                    event: StatAction.userCollectionRate,
                    params: {
                        collectionId: params[0],
                        stars: Number(params[1]),
                    },
                };

            case EventCode.collectionInFavorites:
                return {
                    event: StatAction.collectionInFavorites,
                    params: {
                        collectionId: params[0],
                    },
                };

            case EventCode.collectionInUserFavorites:
                return {
                    event: StatAction.collectionInUserFavorites,
                    params: {
                        userId: params[0],
                    },
                };
            default:
                console.error('Unknown stat event:', code, params);
        }

        return null;
    }

    async getEvents(count = 1) {
        let events: string[];

        if (count > 1) {
            events = await this.redis.zpopmax(STAT_REDIS_KEY, count);
        } else {
            events = await this.redis.zpopmax(STAT_REDIS_KEY);
        }

        if (!events?.length) {
            return [];
        }

        const result: Array<ParsedEvent & { value: number }> = [];
        for (let i = 0; i < events.length; i += 2) {
            const event = events[i];
            const value = events[i + 1];

            const parsed = this.parseEvent(event);

            if (parsed) {
                result.push({ ...parsed, value: Number(value) });
            }
        }

        return result;
    }
}
