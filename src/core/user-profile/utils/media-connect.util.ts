import { UpdateProfileFavouritesInputType } from '../models/inputs/update-profile-favourites-input.type';

export const mediaConnectUtil = (args: UpdateProfileFavouritesInputType) => {
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
