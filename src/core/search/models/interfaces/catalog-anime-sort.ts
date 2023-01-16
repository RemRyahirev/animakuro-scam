import { CatalogSortField } from "../enums/catalog-sort-field.enum";
import { SortOrder } from "../../../../common/models/enums/sort-order.enum";

export interface CatalogAnimeSort {
    sortField?: CatalogSortField;
    sortOrder?: SortOrder;
}
