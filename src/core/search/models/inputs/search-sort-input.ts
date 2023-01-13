import { SearchSortField } from '../enums/search-sort-field.enum';
import { SortOrder } from '../../../../common/models/enums/sort-order.enum';

export interface SearchSortInput {
    sortField?: SearchSortField;
    sortOrder?: SortOrder;
}
