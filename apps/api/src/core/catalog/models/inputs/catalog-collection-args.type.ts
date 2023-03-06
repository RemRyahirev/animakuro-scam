import { IsEnum, IsOptional } from '@nestjs/class-validator';
import { ArgsType, Field } from '@nestjs/graphql';

import { CatalogCollectionSortField } from '../enums/catalog-collection-sort-field.enum';

import { CatalogBasicArgsType } from './catalog-basic-args.type';

@ArgsType()
export class CatalogCollectionArgsType extends CatalogBasicArgsType {
    @IsOptional()
    @IsEnum(CatalogCollectionSortField)
    @Field(() => CatalogCollectionSortField, {
        nullable: true,
        description: 'Field for sorting',
    })
    sort_field?: CatalogCollectionSortField;
}
