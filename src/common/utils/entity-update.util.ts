export function entityUpdateUtil<F extends keyof I, I>(
    field: F,
    input: I,
): any {
    let array: { id: string }[] = [];
    const currentField = input[field] as string[];
    currentField?.forEach((id: string) => {
        array.push({
            id,
        });
    });
    return {
        [field]: {
            connect: [...array]
        }
    }
}
