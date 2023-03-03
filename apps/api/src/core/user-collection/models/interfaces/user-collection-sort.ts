import { SortOrder } from '@app/common/models/enums/sort-order.enum';

import { UserCollectionCollectionSortField } from '../enums/user-collection-sort-field.enum';

export interface UserCollectionSort {
    sort_field?: UserCollectionCollectionSortField;
    sort_order?: SortOrder;
}
