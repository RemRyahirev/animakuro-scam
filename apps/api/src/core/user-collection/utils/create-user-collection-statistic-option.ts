export function createUserCollectionStatisticOptions({
    userRating,
}: {
    userRating: {
        '5'?: number;
        '4'?: number;
        '3'?: number;
        '2'?: number;
        '1'?: number;
    };
}) {
    let score: number = 0;
    const rating = {
        count: 0,
        sum: 0,
    };
    if (!!userRating) {
        const count =
            (userRating[1] ?? 0) +
            (userRating[2] ?? 0) +
            (userRating[3] ?? 0) +
            (userRating[4] ?? 0) +
            (userRating[5] ?? 0);
        const sum =
            Number(userRating[1]) * 1 +
            Number(userRating[2]) * 2 +
            Number(userRating[3]) * 3 +
            Number(userRating[4]) * 4 +
            Number(userRating[5]) * 5;
        score = sum / count;
    }

    return score;
}
