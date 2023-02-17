import { SortOrder } from '@app/common/models/enums/sort-order.enum';

import { CatalogCollectionSortField } from '../enums/catalog-collection-sort-field.enum';

export interface CatalogCollectionSort {
    sort_field?: CatalogCollectionSortField;
    sort_order?: SortOrder;
}
