export function relationUpdateUtil<F, I>(field: F, input: I) {
    const arrayToAdd: { child_anime_id: string }[] = [];
    const arrayToRemove: { child_anime_id: string }[] = [];

    const normalizeArray = (
        inputArray: I[Extract<keyof I, string>],
        outputArray: { child_anime_id: string }[],
    ) => {
        if (Array.isArray(inputArray)) {
            inputArray.forEach((child_anime_id: string) => {
                outputArray.push({
                    child_anime_id,
                });
            });
        }
    };

    for (const key in input) {
        if (
            key.toLowerCase().includes('add') &&
            key.includes(field as string)
        ) {
            normalizeArray(input[key], arrayToAdd);
            delete input[key];
        }
        if (
            key.toLowerCase().includes('remove') &&
            key.includes(field as string)
        ) {
            normalizeArray(input[key], arrayToRemove);
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
