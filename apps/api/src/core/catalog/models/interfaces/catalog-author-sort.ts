import { SortOrder } from '@app/common/models/enums/sort-order.enum';

import { CatalogAuthorSortField } from '../enums/catalog-author-sort-field.enum';

export interface CatalogAuthorSort {
    sort_field?: CatalogAuthorSortField;
    sort_order?: SortOrder;
}
