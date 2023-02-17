import { AnimeApproval, AnimeRelation } from '@prisma/client';

export function relationAnimeUpdateUtil<F, I>(field: F, input: I) {
    const arrayToAdd: {
        child_anime_id: string;
        status: AnimeRelation | AnimeApproval;
    }[] = [];
    const arrayToRemove: {
        child_anime_id: string;
        status: AnimeRelation | AnimeApproval;
    }[] = [];

    const normalizeArray = (
        inputArray: I[Extract<keyof I, string>],
        outputArray: {
            child_anime_id: string;
            status?: AnimeRelation | AnimeApproval;
        }[],
        key: string,
    ) => {
        if (Array.isArray(inputArray)) {
            inputArray.forEach((element) => {
                if (key.includes('add')) {
                    outputArray.push({
                        child_anime_id: element.id,
                        status: element.status,
                    });
                } else {
                    outputArray.push({
                        child_anime_id: element.id,
                    });
                }
            });
        }
    };

    for (const key in input) {
        if (
            key.toLowerCase().includes('add') &&
            key.includes(field as string)
        ) {
            normalizeArray(input[key], arrayToAdd, key);
            delete input[key];
        }
        if (
            key.toLowerCase().includes('remove') &&
            key.includes(field as string)
        ) {
            normalizeArray(input[key], arrayToRemove, key);
            delete input[key];
        }
    }
    const createObj = {
        createMany: {
            data: [...arrayToAdd],
        },
    };
    const deleteObj = {
        deleteMany: [...arrayToRemove],
    };
    return {
        [field as string]: {
            ...(arrayToAdd.length ? createObj : false),
            ...(arrayToRemove.length ? deleteObj : false),
        },
    };
}
