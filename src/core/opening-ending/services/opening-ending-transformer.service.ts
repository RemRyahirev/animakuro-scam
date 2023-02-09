


export class OpeningEndingTransformerService {
    constructor() {}

    featureThree: any = {
        min: 'gte',
        max: 'lte'
    }

    transformInput(input: any, keyWords: string[]) {
        const where: any = {};

        for (const [key, value] of Object.entries(input)) {
            
            const modificatorArr = key.split(new RegExp(`^(${keyWords.join('|')})_(.*)`))
                .filter(Boolean);
            
            if (value === undefined) continue;

            if (modificatorArr.length === 1) {
                where[modificatorArr[0]] = value;
            } else {
                where[modificatorArr[1]] = {
                    ...where[modificatorArr[1]], 
                    [this.featureThree[modificatorArr[0]]]: value
                }
            }
        }
        return where;
    }
}