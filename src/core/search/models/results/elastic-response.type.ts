export type ElasticResults = {
    results: ElasticResultsItem[];
};

interface ElasticResultsItem {
    id: string;
    matchScore: string;
}
