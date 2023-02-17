import { SortOrder } from '@app/common/models/enums/sort-order.enum';

import { CatalogCharacterSortField } from '../enums/catalog-character-sort-field.enum';

export interface CatalogCharacterSort {
    sort_field?: CatalogCharacterSortField;
    sort_order?: SortOrder;
}
