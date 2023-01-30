// ПРОРАБОТАТЬ ТИПЫ
export const profileFavoritesUtil = (input: any[]) => {
    const result: /*GetProfileFavouritesResultsType['profileFavourites']*/ any =
        {
            id: input[0].id,
            profile_id: input[0].profile_id,
            studios: [],
            animes: [],
            authors: [],
            characters: [],
            genres: [],
            profile: input[0].profile,
        };

    input.forEach((favourite: any) => {
        const media_type = favourite.media_type.toLowerCase();

        result[media_type].push(...favourite[media_type]);
    });

    return result;
};
