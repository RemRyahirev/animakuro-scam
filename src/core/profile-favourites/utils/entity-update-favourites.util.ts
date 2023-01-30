import { CreateProfileFavouritesInputType } from '../models/inputs/create-profile-favourites-input.type';

export function entityUpdateFavouritesUtil<I>(input: I) {
    const arrayToAdd: { id: string }[] = [];
    const arrayToRemove: { id: string }[] = [];
    const normalizeArray = (
        inputArray: I[Extract<keyof I, string>],
        outputArray: { id: string }[],
    ) => {
        if (Array.isArray(inputArray)) {
            inputArray.forEach((id: string) => {
                outputArray.push({
                    id,
                });
            });
        }
    };
    for (const key in input) {
        if (key === 'media_add') {
            normalizeArray(input[key], arrayToAdd);
            delete input[key];
        }
        if (key === 'media_remove') {
            normalizeArray(input[key], arrayToRemove);
            delete input[key];
        }
    }
    const connectObj = {
        connect: [...arrayToAdd],
    };
    const disconnectObj = {
        disconnect: [...arrayToRemove],
    };
    return {
        [(input as CreateProfileFavouritesInputType).media_type.toLowerCase()]:
            {
                ...(arrayToAdd.length ? connectObj : false),
                ...(arrayToRemove.length ? disconnectObj : false),
            },
    };
}
