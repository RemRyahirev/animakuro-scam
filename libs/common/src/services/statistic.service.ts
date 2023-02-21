import { Injectable } from '@nestjs/common';
import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import {
    AnimeType,
    FolderType,
} from '@prisma/client';

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
        animeType: AnimeType;
        genreId: string;
    };
    statFolder: {
        userId: string;
        folderId: string;
        folderType: FolderType;
        animeType: AnimeType;
        genreId: string;
    };
    animeType: {
        animeId: string;
        animeType: AnimeType;
    };
    animeGenre: {
        animeId: string;
        genreId: string;
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
} as const satisfies Record<StatAction, string>;
type EventCodes = typeof EventCode[keyof typeof EventCode];

const Key = {
    animeInFavorites:
        ({ animeId }: { animeId: string }) =>
            `${EventCode.animeInFavorites}:${animeId}`,
    animeInUserFavorites:
        ({ userId }: { userId: string }) =>
            `${EventCode.animeInUserFavorites}:${userId}`,
    animeUserRate:
        ({ animeId, stars }: { animeId: string, stars: number }) =>
            `${EventCode.animeUserRate}:${animeId}:${stars}`,
    animeInFolder:
        ({ animeId, folderType }: { animeId: string, folderType: FolderType }) =>
            `${EventCode.animeInFolder}:${animeId}:${folderType}`,
    animeInUserFolder:
        ({ userId, folderId, folderType, animeType, genreId }: { userId: string, folderId: string, folderType: FolderType, animeType: AnimeType, genreId: string }) =>
            `${EventCode.animeInUserFolder}:${userId}:${folderId}:${folderType}:${animeType}:${genreId}`,
    statFolder:
        ({ userId, folderId, folderType, animeType, genreId }: { userId: string, folderId: string, folderType: FolderType, animeType: AnimeType, genreId: string }) =>
            `${EventCode.statFolder}:${userId}:${folderId}:${folderType}:${animeType}:${genreId}`,
    animeType:
        ({ animeId }: { animeId: string }) =>
            `${EventCode.animeType}:${animeId}`,
    animeGenre:
        ({ animeId, genreId }: { animeId: string, genreId: string }) =>
            `${EventCode.animeGenre}:${animeId}:${genreId}`,
} satisfies Record<StatAction, (...args: any[]) => string>;
type ParsedEvent = ({
    [P in StatAction]: {
        event: P;
        params: Parameters<typeof Key[P]>[0];
    };
})[StatAction];

@Injectable()
export class StatisticService {
    constructor(
        @InjectRedis() protected readonly redis: Redis,
    ) {}

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

                await this.redis.zadd(STAT_REDIS_KEY, params.animeType, Key.animeType(params));
                break;

            case 'animeGenre':
                params = opts as UserAction['animeGenre'];

                await this.redis.zadd(STAT_REDIS_KEY, changedBy, Key.animeGenre(params));
                break;

            default:
                console.error('Unknown stat event:', event, opts);
        }
    }

    private parseEvent(
        event: string,
    ): ParsedEvent | null {
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
                        animeType: AnimeType[params[3] as keyof typeof AnimeType],
                        genreId: params[4],
                    },
                };

            case EventCode.statFolder:
                return {
                    event: StatAction.statFolder,
                    params: {
                        userId: params[0],
                        folderId: params[1],
                        folderType: FolderType[params[2] as keyof typeof FolderType],
                        animeType: AnimeType[params[3] as keyof typeof AnimeType],
                        genreId: params[4],
                    },
                };

            case EventCode.animeType:
                return {
                    event: StatAction.animeType,
                    params: {
                        animeId: params[0],
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

            default:
                console.error('Unknown stat event:', code, params);
        }

        return null;
    }

    async getEvents(
        count = 1,
    ) {
        let events: string[];

        if (count > 1) {
            events = await this.redis.zpopmax(STAT_REDIS_KEY, count);
        } else {
            events = await this.redis.zpopmax(STAT_REDIS_KEY);
        }

        if (!events?.length) {
            return [];
        }

        const result: Array<ParsedEvent & { value: string }> = [];
        for (let i = 0; i < events.length; i += 2) {
            const event = events[i];
            const value = events[i + 1];

            const parsed = this.parseEvent(event);

            if (parsed) {
                result.push({ ...parsed, value });
            }
        }

        return result;
    }
}
