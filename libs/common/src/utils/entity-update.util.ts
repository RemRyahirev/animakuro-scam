export function entityUpdateUtil<F , I>(
    field: F,
    input: I,
) {
    let arrayToAdd: { id: string }[] = [];
    let arrayToRemove: { id: string }[] = [];
    const normalizeArray = (inputArray: I[Extract<keyof I, string>], outputArray: { id: string }[]) => {
        if (Array.isArray(inputArray)){
            inputArray.forEach((id: string) => {
                outputArray.push({
                    id,
                });
            });
        }
    }
    for (const key in input) {
        if (key.toLowerCase().includes('add') && key.includes(field as string)){
            normalizeArray(input[key], arrayToAdd);
            delete input[key];
        }
        if (key.toLowerCase().includes('remove') && key.includes(field as string)){
            normalizeArray(input[key], arrayToRemove);
            delete input[key];
        }
    }
    const connectObj = {
        connect: [...arrayToAdd],
    }
    const disconnectObj = {
        disconnect: [...arrayToRemove],
    }
    return {
        [field as string]: {
            ...(arrayToAdd.length ? connectObj : false),
            ...(arrayToRemove.length ? disconnectObj : false),
        }
    }
}
