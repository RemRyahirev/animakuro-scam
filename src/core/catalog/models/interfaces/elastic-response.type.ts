export type ElasticResults = {
    results: ElasticResultsItem[];
    done: boolean
};

type ElasticResultsItem = {
    id: string;
    matchScore: string;
}
