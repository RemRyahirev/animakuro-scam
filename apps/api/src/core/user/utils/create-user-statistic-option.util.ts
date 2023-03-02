export async function createUserStatisticOptions(favourite: any) {
    if (Array.isArray(favourite) && favourite.length > 0) {
        return await favourite.map((el: any) => {
            return createStatisticbyObject(el);
        });
    } else if (typeof favourite === 'object') {
        return createStatisticbyObject(favourite);
    }
    return favourite;
}

function createStatisticbyObject(el: any) {
    if (!!el.statistics) {
        const rating = {
            count: 0,
            sum: 0,
        };
        for (const key in el.statistics.userRating) {
            rating.count += Number(el.statistics.userRating[key]);
            rating.sum += Number(el.statistics.userRating[key]) * Number(key);
        }
        el.statistics.score = rating.sum / rating.count;
    }
    return { ...el, statistics: el.statistics };
}
