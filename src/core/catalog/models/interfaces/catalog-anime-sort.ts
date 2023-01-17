import { CatalogAnimeSortField } from "../enums/catalog-anime-sort-field.enum";
import { SortOrder } from "../../../../common/models/enums/sort-order.enum";

export interface CatalogAnimeSort {
    sortField?: CatalogAnimeSortField;
    sortOrder?: SortOrder;
}
