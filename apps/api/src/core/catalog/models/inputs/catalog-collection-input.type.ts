import { IsEnum, IsOptional } from '@nestjs/class-validator';
import { ArgsType, Field } from '@nestjs/graphql';

import { CatalogCollectionSortField } from '../enums/catalog-collection-sort-field.enum';

import { CatalogBasicInputType } from './catalog-basic-input.type';

@ArgsType()
export class CatalogCollectionInputType extends CatalogBasicInputType {
    @IsOptional()
    @IsEnum(CatalogCollectionSortField)
    @Field(() => CatalogCollectionSortField, {
        nullable: true,
        description: 'Field for sorting',
    })
    sort_field?: CatalogCollectionSortField;
}
