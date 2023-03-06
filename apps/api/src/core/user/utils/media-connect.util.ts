import { UpdateUserFavouritesArgsType } from '../models/inputs/update-user-favourites-args.type';

export const mediaConnectUtil = (args: UpdateUserFavouritesArgsType) => {
    const result: any = {
        connect: [],
        disconnect: [],
    };

    if (args.media_add) {
        result.connect.push({
            id: args.media_add,
        });
    }

    if (args.media_remove) {
        result.disconnect.push({
            id: args.media_remove,
        });
    }

    return { [`favourite_${args.media_type.toLowerCase()}`]: result };
};
