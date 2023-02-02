import { CatalogCollectionSortField } from '../enums/catalog-collection-sort-field.enum';
import { SortOrder } from '../../../../common/models/enums/sort-order.enum';

export interface CatalogCollectionSort {
    sort_field?: CatalogCollectionSortField;
    sort_order?: SortOrder;
}
