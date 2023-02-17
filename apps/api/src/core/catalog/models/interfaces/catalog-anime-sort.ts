import { SortOrder } from '@app/common/models/enums/sort-order.enum';

import { CatalogAnimeSortField } from '../enums/catalog-anime-sort-field.enum';

export interface CatalogAnimeSort {
    sort_field?: CatalogAnimeSortField;
    sort_order?: SortOrder;
}
