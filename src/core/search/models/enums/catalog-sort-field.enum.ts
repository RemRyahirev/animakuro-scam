import { registerEnumType } from '@nestjs/graphql';
import 'reflect-metadata';

export enum SearchSortField {
    TITLE = 'title',
    RELEASE_DATE = 'release_date',
}

registerEnumType(SearchSortField, {
    name: 'SearchSortField',
});
