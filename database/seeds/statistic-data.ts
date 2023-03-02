import { StatisticName } from '@prisma/client';

export const statisticData = async () => {
    return [
        {
            name: StatisticName.FAVORITES,
            data: {},
        },
        {
            name: StatisticName.ANIME_USER_RATING,
            data: {},
        },
        {
            name: StatisticName.ANIME_FOLDER,
            data: {},
        },
        {
            name: StatisticName.COLLECTION_USER_RATING,
            data: {},
        }
    ];
};
