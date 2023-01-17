import { CatalogAnimeSortField } from "../enums/catalog-anime-sort-field.enum";
import { SortOrder } from "../../../../common/models/enums/sort-order.enum";

export interface CatalogAnimeSort {
    sort_field?: CatalogAnimeSortField;
    sort_order?: SortOrder;
}
