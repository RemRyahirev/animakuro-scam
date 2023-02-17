import { SortOrder } from '@app/common/models/enums/sort-order.enum';

import { CatalogStudioSortField } from '../enums/catalog-studio-sort-field.enum';

export interface CatalogStudioSort {
    sort_field?: CatalogStudioSortField;
    sort_order?: SortOrder;
}
