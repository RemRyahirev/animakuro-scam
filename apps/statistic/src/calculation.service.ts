import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SchedulerRegistry } from '@nestjs/schedule';
import { StatisticName } from '@prisma/client';

import { AnimeType, FolderType } from '@app/common/models/enums';
import { PrismaService } from '@app/common/services/prisma.service';
import { StatisticService } from '@app/common/services/statistic.service';

/*
1. Статистика по папкам (Всех пользователей) к конкретному аниме (Ко всем)
2. Статистика по рейтингу (Всех пользователей) к конкретному аниме (Ко всем)
4. Статистика по избранным (Всех пользователей) к конкретному аниме (Ко всем) (Количество в избранном) * все сущьности избранных
4. Статистика пользователя
   4.1 Статистика по папкам (из папок учитывать в статистике)
   4.2 Статистика по избранным
   4.3 Всего аниме в папках (всех) (из папок учитывать в статистике)
   4.4 Топ 4 самых просмотриваеммых типов аниме (из папок учитывать в статистике)
   4.5 Топ 4 самых просмотриваеммых жанров аниме (из папок учитывать в статистике)
 */

/*
actions:
1. add anime to favorites (+ remove)
    - AFav:<anime_id> = +1/-1
        > anime.favorites++
        > statistics: stat_name=favorites, counters.anime++
    - AUFav:<user_id> = +1/-1
        > user.favorites.anime++
2. rate anime (+ change rate, remove rate)
    - AUR:<anime_id>:<stars> = +1/-1
        > anime.userRating.<star>++
        > statistics: stat_name=anime_user_rating, counters.<stars>++
3. add anime to folder (+ remove from folder, change is_statistic_active)
    - AIF:<anime_id>:<folder_type> = +1/-1
        > anime.folder.<folder_type>++
        > statistics: stat_name=anime_folder, counter.<folder_type>++
    - AIUF:<user_id>:<folder_id>:<folder_type>:<anime_id> = +1/-1
        > user.folder.total++
        >            .type.<folder_type>++
        >            .id.<folder_id>++
        >     .viewedAnime.type.<anime_type>++ (only if viewed, check by <folder_type>)
        >                 .genre.<genre_id>++ (only if viewed, check by <folder_type>)
    - SF:<user_id>:<folder_id>:<folder_type> = +1/-1 (with replace, not sum)
        > user.folder.total++ (on or off, find how much anime in folder)
        >            .type.<folder_type>++
        >            .id.<folder_id>++
        >     .viewedAnime.type.<anime_type>++ (on or off, find how much anime in folder by type & genre)
        >                 .genre.<genre_id>++
4. change anime type
    - AT:<anime_id>:<anime_type>
        > user.viewedAnime.type.<anime_type>++ (-- for old, ++ for new, only if viewed, for every user)
5. add genre to anime (+ remove anime genre)
    - AG:<anime_id>:<genre_id> = +1/-1 (with replace, not sum)
        > user.viewedAnime.genre.<genre_id>++ (-- for old, ++ for new, only if viewed, for every user)
6. get anime
    - GAN:<anime_id> = +1
        > anime.requests++
7. get character
    - GCH:<character_id> = +1
        > character.requests++
8. get author
    - GAU:<author_id> = +1
        > author.requests++
9. get profile
    - GPR:<profile_id> = +1
        > profile.requests++
 */

/*
store in redis:
1.  animeInFavorites (incr)     - AFav:<anime_id>
2.  animeInUserFavorites (incr) - AUFav:<user_id>
3.  animeUserRate (incr)        - AUR:<anime_id>:<stars>
4.  animeInFolder (incr)        - AIF:<anime_id>:<folder_type>
5.  animeInUserFolder (incr)    - AIUF:<user_id>:<folder_id>:<folder_type>:<anime_id>
6.  statFolder (final)          - SF:<user_id>:<folder_id>:<folder_type>
7.  animeType (final)           - AT:<anime_id>:<anime_type>
8.  animeGenre (final)          - AG:<anime_id>:<genre_id>
9.  getAnime (incr)             - GAN:<anime_id>
10. getCharacter (incr)         - GCH:<character_id>
11. getAuthor (incr)            - GAU:<author_id>
12. getProfile (incr)           - GPR:<profile_id>

insert incr: zincrby
insert final: zadd
get: zpopmax
 */

const buildJsonPath = (
    jsonFieldName: string,
    path: string[],
) => {
    let resultSql = '';
    let wholeEmptyJson = '{';
    let prevPath = '';

    for (let i = 0, iLen = path.length; i < iLen - 1; ++i) {
        const key = path[i];
        wholeEmptyJson += `"${key}":{`;

        const nextPath = (prevPath.length ? prevPath + ',' : '') + key;
        resultSql += ` WHEN ${jsonFieldName}#>'{${nextPath}}' IS NULL THEN jsonb_set(${jsonFieldName}, '{${nextPath}}', '{}')`;
        prevPath = nextPath;
    }

    wholeEmptyJson += '}'.repeat(path.length);
    resultSql = `CASE WHEN ${jsonFieldName} IS NULL THEN '${wholeEmptyJson}' ${resultSql} ELSE ${jsonFieldName} END`;

    return resultSql;
};

@Injectable()
export class CalculationService implements OnModuleInit {
    constructor(
        private readonly config: ConfigService,
        private readonly schedulerRegistry: SchedulerRegistry,
        private readonly statistic: StatisticService,
        private readonly prisma: PrismaService,
    ) {}

    private async updateGlobalStatistic(
        name: StatisticName,
        path: string[],
        value: number,
    ) {
        const pathStr = '{' + path.join(',') + '}';

        // XXX: there is no other way to make atomic updates on json field with prisma
        return await this.prisma.$executeRawUnsafe(
            `UPDATE statistic
                SET data = jsonb_set(
                      ${buildJsonPath('data', path)},
                      $1::text[],
                      (COALESCE(data#>$1::text[], '0')::int + $2)::text::jsonb
                    )
              WHERE name = $3::"StatisticName"`,
            pathStr,
            value,
            name,
        );
    }

    private async updateAnimeStatistics(
        id: string,
        path: string[],
        value: number,
    ) {
        const pathStr = '{' + path.join(',') + '}';

        // XXX: there is no other way to make atomic updates on json field with prisma
        return await this.prisma.$executeRawUnsafe(
            `UPDATE anime
                SET statistics = jsonb_set(
                      ${buildJsonPath('statistics', path)},
                      $1::text[],
                      (COALESCE(statistics#>$1::text[], '0')::int + $2)::text::jsonb
                    )
              WHERE id = $3::uuid`,
            pathStr,
            value,
            id,
        );
    }

    private async updateCharacterStatistics(
        id: string,
        path: string[],
        value: number,
    ) {
        const pathStr = '{' + path.join(',') + '}';

        // XXX: there is no other way to make atomic updates on json field with prisma
        return await this.prisma.$executeRawUnsafe(
            `UPDATE character
                SET statistics = jsonb_set(
                      ${buildJsonPath('statistics', path)},
                      $1::text[],
                      (COALESCE(statistics#>$1::text[], '0')::int + $2)::text::jsonb
                    )
              WHERE id = $3::uuid`,
            pathStr,
            value,
            id,
        );
    }

    private async updateAuthorStatistics(
        id: string,
        path: string[],
        value: number,
    ) {
        const pathStr = '{' + path.join(',') + '}';

        // XXX: there is no other way to make atomic updates on json field with prisma
        return await this.prisma.$executeRawUnsafe(
            `UPDATE author
                SET statistics = jsonb_set(
                      ${buildJsonPath('statistics', path)},
                      $1::text[],
                      (COALESCE(statistics#>$1::text[], '0')::int + $2)::text::jsonb
                    )
              WHERE id = $3::uuid`,
            pathStr,
            value,
            id,
        );
    }

    private async updateProfileStatistics(
        id: string,
        path: string[],
        value: number,
    ) {
        const pathStr = '{' + path.join(',') + '}';

        // XXX: there is no other way to make atomic updates on json field with prisma
        return await this.prisma.$executeRawUnsafe(
            `UPDATE user_profile
                SET statistics = jsonb_set(
                      ${buildJsonPath('statistics', path)},
                      $1::text[],
                      (COALESCE(statistics#>$1::text[], '0')::int + $2)::text::jsonb
                    )
              WHERE id = $3::uuid`,
            pathStr,
            value,
            id,
        );
    }


    async checkQueue() {
        const events = await this.statistic.getEvents(
            this.config.get('STATISTIC_CHUNK_SIZE', 1),
        );

        if (!events?.length) {
            return;
        }

        const startTime = Date.now();

        // console.log('Events:', events);

        for (const event of events) {
            switch (event.event) {
                case 'animeInFavorites':
                    await Promise.all([
                        this.updateAnimeStatistics(
                            event.params.animeId,
                            ['favorites'],
                            event.value,
                        ),
                        this.updateGlobalStatistic(
                            StatisticName.FAVORITES,
                            ['anime'],
                            event.value,
                        ),
                    ]);
                    break;

                case 'animeInUserFavorites':
                    await this.updateProfileStatistics(
                        event.params.profileId,
                        ['favorites', 'anime'],
                        event.value,
                    );
                    break;

                case 'animeUserRate':
                    await Promise.all([
                        this.updateGlobalStatistic(
                            StatisticName.ANIME_USER_RATING,
                            [String(event.params.stars)],
                            event.value,
                        ),
                        this.updateAnimeStatistics(
                            event.params.animeId,
                            ['userRating', String(event.params.stars)],
                            event.value,
                        ),
                    ]);
                    break;

                case 'animeInFolder':
                    await Promise.all([
                        this.updateAnimeStatistics(
                            event.params.animeId,
                            ['folder', event.params.folderType],
                            event.value,
                        ),
                        this.updateGlobalStatistic(
                            StatisticName.ANIME_FOLDER,
                            [event.params.folderType],
                            event.value,
                        ),
                    ]);
                    break

                case 'animeInUserFolder':
                    const folder = await this.prisma.userFolder.findUnique({
                        where: {
                            id: event.params.folderId,
                        },
                        select: {
                            is_statistic_active: true,
                        },
                    });

                    if (!folder?.is_statistic_active) {
                        break;
                    }

                    await Promise.all([
                        this.updateProfileStatistics(
                            event.params.profileId,
                            ['folder', 'total'],
                            event.value,
                        ),
                        this.updateProfileStatistics(
                            event.params.profileId,
                            ['folder', 'type', event.params.folderType],
                            event.value,
                        ),
                        this.updateProfileStatistics(
                            event.params.profileId,
                            ['folder', 'id', event.params.folderId],
                            event.value,
                        ),
                    ]);

                    if (event.params.folderType !== FolderType.COMPLETED) {
                        break;
                    }

                    const anime = await this.prisma.anime.findUnique({
                        where: {
                            id: event.params.animeId,
                        },
                        select: {
                            type: true,
                            genres: {
                                select: {
                                    id: true,
                                },
                            }
                        },
                    });

                    if (!anime?.type) {
                        break;
                    }

                    await Promise.all([
                        this.updateProfileStatistics(
                            event.params.profileId,
                            ['viewedAnime', 'type', anime.type],
                            event.value,
                        ),
                        ...(anime.genres?.map(genre =>
                            this.updateProfileStatistics(
                                event.params.profileId,
                                ['viewedAnime', 'genre', genre.id],
                                event.value,
                            ),
                        ) ?? []),
                    ]);

                    break;

                case 'statFolder':
                    if (event.value === 0) {
                        break;
                    }

                    let animeFields = {};
                    if (event.params.folderType === FolderType.COMPLETED) {
                        animeFields = {
                            type: true,
                            genres: {
                                select: {
                                    id: true,
                                },
                            },
                        };
                    }

                    const statFolder = await this.prisma.userFolder.findUnique({
                        where: {
                            id: event.params.folderId,
                        },
                        select: {
                            animes: {
                                select: {
                                    id: true,
                                    ...animeFields,
                                },
                            }
                        },
                    });

                    if (!statFolder?.animes?.length) {
                        break;
                    }
                    const animeCount = statFolder.animes.length;
                    const multiplier = event.value > 0 ? 1 : -1;
                    const animeCountDiff = animeCount * multiplier;

                    await Promise.all([
                        this.updateProfileStatistics(
                            event.params.profileId,
                            ['folder', 'total'],
                            animeCountDiff,
                        ),
                        this.updateProfileStatistics(
                            event.params.profileId,
                            ['folder', 'type', event.params.folderType],
                            animeCountDiff,
                        ),
                        this.updateProfileStatistics(
                            event.params.profileId,
                            ['folder', 'id', event.params.folderId],
                            animeCountDiff,
                        ),
                    ]);

                    if (event.params.folderType === FolderType.COMPLETED) {
                        await Promise.all(
                            (statFolder.animes as Array<{ id: string, type: AnimeType, genres: Array<{ id: string}> }>)
                                .reduce((arr, anime) => {
                                    arr.push(
                                        this.updateProfileStatistics(
                                            event.params.profileId,
                                            ['viewedAnime', 'type', anime.type],
                                            multiplier,
                                        ),
                                        ...(anime.genres?.map(genre =>
                                            this.updateProfileStatistics(
                                                event.params.profileId,
                                                ['viewedAnime', 'genre', genre.id],
                                                multiplier,
                                            ),
                                        ) ?? []),
                                    );

                                    return arr;
                                }, [] as Promise<number>[]),
                        );
                    }
                    break;

                case 'animeType':
                    const allFoldersAT = await this.prisma.userFolder.findMany({
                        where: {
                            type: FolderType.COMPLETED,
                            is_statistic_active: true,
                            animes: {
                                some: {
                                    id: event.params.animeId,
                                },
                            },
                        },
                        select: {
                            user_profile_id: true,
                        },
                    });

                    await Promise.all(allFoldersAT?.map(folder =>
                        this.updateProfileStatistics(
                            folder.user_profile_id,
                            ['viewedAnime', 'type', event.params.animeType],
                            event.value,
                        ),
                    ) ?? []);
                    break;

                case 'animeGenre':
                    const allFoldersAG = await this.prisma.userFolder.findMany({
                        where: {
                            type: FolderType.COMPLETED,
                            is_statistic_active: true,
                            animes: {
                                some: {
                                    id: event.params.animeId,
                                },
                            },
                        },
                        select: {
                            user_profile_id: true,
                        },
                    });

                    await Promise.all(allFoldersAG?.map(folder =>
                        this.updateProfileStatistics(
                            folder.user_profile_id,
                            ['viewedAnime', 'genre', event.params.genreId],
                            event.value,
                        ),
                    ) ?? []);
                    break;

                case 'getAnime':
                    await this.updateAnimeStatistics(
                        event.params.animeId,
                        ['requests'],
                        event.value,
                    );
                    break;

                case 'getCharacter':
                    await this.updateCharacterStatistics(
                        event.params.characterId,
                        ['requests'],
                        event.value,
                    );
                    break;

                case 'getAuthor':
                    await this.updateAuthorStatistics(
                        event.params.authorId,
                        ['requests'],
                        event.value,
                    );
                    break;

                case 'getProfile':
                    await this.updateProfileStatistics(
                        event.params.profileId,
                        ['requests'],
                        event.value,
                    );
                    break;

                default:
                    console.error('Unknown event:', event);
            }
        }

        const duration = Date.now() - startTime;
        console.log('Events processed:', {
            chunk: events.length,
            durationSec: duration / 1000,
            durationSecPerEvent: Math.round(duration / events.length) / 1000
        });
    }

    async onModuleInit() {
        this.schedulerRegistry.addInterval(
            'checkQueue',
            setInterval(
                () => this.checkQueue(),
                this.config.get('STATISTIC_RUN_INTERVAL', 2000),
            ),
        );
    }
}
