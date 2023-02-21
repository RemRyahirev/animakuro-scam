import { Injectable } from '@nestjs/common';

/*
1. Статистика по папкам (Всех пользователей) к конкретному аниме (Ко всем)
2. Статистика по рейтингу (Всех пользователей) к конкретному аниме (Ко всем)
4. Статистика по избранным  (Всех пользователей) к конкретному аниме (Ко всем)  (Количество в избранном) * все сущьности избранных
4. Статистика пользователя
   4.1 Статистика по папкам  (из папок учитывать в статистике)
   4.2 Статистика по избранным
   4.3 Всего аниме в папках (всех)  (из папок учитывать в статистике)
   4.4 Топ 4 самых просмотриваеммых типов аниме  (из папок учитывать в статистике)
   4.5 Топ 4 самых просмотриваеммых жанров аниме (из папок учитывать в статистике)
 */

/*
actions:
1. add anime to favorites (+ remove)
    - anim_fav:<anime_id> = +1/-1
        > anime.favorites++
        > statistics: stat_name=favorites, counters.anime++
    - usr_anim_fav:<user_id> = +1/-1
        > user.favorites.anime++
2. rate anime (+ change rate, remove rate)
    - anim_rate:<anime_id>:<star> = +1/-1
        > anime.userRating.<star>++
        > statistics: stat_name=anime_user_rating, counter.<star>++
3. add anime to folder (+ remove from folder, change is_statistic_active)
    - anim_fold:<anime_id>:<folder_type> = +1/-1
        > anime.folder.<folder_type>++
        > statistics: stat_name=anime_folder, counter.<folder_type>++
    - usr_fold:<user_id>:<folder_id>:<folder_type>:<anime_type>:<genre_id> = +1/-1
        > user.folder.total++
        >            .type.<folder_type>++
        >            .id.<folder_id>++
        >     .viewedAnime.type.<anime_type>++ (only if viewed, check by <folder_type>)
        >                 .genre.<genre_id>++ (only if viewed, check by <folder_type>)
    - active_fold:<user_id>:<folder_id>:<folder_type>:<anime_type>:<genre_id> = +1/-1 (with replace, not sum)
        > user.folder.total++ (on or off, find how much anime in folder)
        >            .type.<folder_type>++
        >            .id.<folder_id>++
        >     .viewedAnime.type.<anime_type>++ (on or off, find how much anime in folder by type & genre)
        >                 .genre.<genre_id>++
4. change anime type
    - anim_type:<anime_id> = <anime_type>
        > user.viewedAnime.type.<anime_type>++ (-- for old, ++ for new, only if viewed, for every user)
5. add genre to anime (+ remove anime genre)
    - anim_genre:<anime_id>:<genre_id> = +1/-1 (with replace, not sum)
        > user.viewedAnime.genre.<genre_id>++ (-- for old, ++ for new, only if viewed, for every user)
 */

/*
store in redis:
1. animeInFavorites (incr)      - AFav:<anime_id>
2. animeInUserFavorites (incr)  - AUFav:<user_id>
3. animeUserRate (incr)         - AUR:<anime_id>:<stars>
4. animeInFolder (incr)         - AIF:<anime_id>:<folder_type>
5. animeInUserFolder (incr)     - AIUF:<user_id>:<folder_id>:<folder_type>:<anime_type>:<genre_id>
6. statFolder (final)           - SF:<user_id>:<folder_id>:<folder_type>:<anime_type>:<genre_id>
7. animeType (final)            - AT:<anime_id> => <anime_type>
8. animeGenre (final)           - AG:<anime_id>:<genre_id>

insert incr: zincrby
insert final: zadd
get: zpopmax
 */

/*
where to store result statistics:
1. amount of anime in all users' folders (by folder type) by anime/overall
    - by anime - in anime (by folder type)
    - overall - in statistics table (by folder type)
2. total anime user rating (by stars) by anime/overall
    - by anime - in anime (by stars)
    - overall - in statistics table (by stars)
3. amount of anime in favorites by anime/overall
    - by anime - in anime
    - overall - in statistics table
4. amount of anime in user's folders by user & folder type
    - in user
5. amount of anime (and other) in user's favorites by user
    - in user (we can't just use length because it's linked table, not a field)
6. amount of anime in all user's folders by user
    - in user (or can't we just use sum of #4 stats?)
7. amount of anime in all user's folders by user & anime type
    - in user (by anime type)
8. amount of anime in all user's folders by user & genre
    - in user (by genre)

TODO: check if it possible to increment amount inside json object (YES)

anime fields:
    - statistics: JSON {
        folder: {
          <type>: <amount>,
        },
        userRating: {
          <stars>: <amount>,
        },
        favorites: <amount>,
      }
user fields:
    - statistics: JSON {
        folder: {
          total: <amount>,
          type: {
            <type>: <amount>,
          },
          id: {
            <folder_id>: <amount>,
          },
        },
        favorites: {
          anime: <amount>,
        },
        viewedAnime: {
            type: {
              <type>: <amount>,
            },
            genre: {
              <genre>: <amount>,
            },
        },
      }
statistics table:
    - stat_name: enum PK
    - counters: JSON

    query: select counters from statistics where stat_name = $1 limit 1;
 */

@Injectable()
export class StatisticService {
    getHello(): string {
        return 'Hello World!';
    }

    /**
     * TODO:
     *   - run on interval basis
     *   - ability to trigger handler on http request
     *   - check redis queues
     *   - recalculate statistic based on queue type & params
     *   - save statistic into corresponding prisma model
     *   - logs
     *   - metrics
     *   - setup build & run (both dev & prod)
     */
}
