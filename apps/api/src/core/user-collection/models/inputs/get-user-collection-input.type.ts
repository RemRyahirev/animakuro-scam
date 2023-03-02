import { IsOptional, IsString, IsEnum, IsDate } from 'class-validator';
import { ArgsType, Field } from '@nestjs/graphql';

import { CreateUserFolderInputType } from '../../../user-folder/models/inputs/create-user-folder-input.type';
import { SortOrder } from '@app/common/models/enums/sort-order.enum';
import { UserCollectionCollectionSortField } from '../enums/user-collection-sort-field.enum';

@ArgsType()
export class GetUserCollectionInputType {
    @IsOptional()
    @IsString()
    @Field(() => SortOrder, { nullable: true, description: 'Sort order' })
    sort_order?: SortOrder;

    @IsOptional()
    @IsEnum(UserCollectionCollectionSortField)
    @Field(() => UserCollectionCollectionSortField, {
        nullable: true,
        description: 'Field for sorting',
    })
    sort_field?: UserCollectionCollectionSortField;

    @IsOptional()
    @IsDate()
    @Field(() => Date, {
        nullable: true,
        description: 'ISO 8601. Start created_at date',
    })
    start_created_at?: Date;

    @IsOptional()
    @IsDate()
    @Field(() => Date, {
        nullable: true,
        description: 'ISO 8601. End created_at date',
    })
    end_created_at?: Date;

    @IsOptional()
    @IsDate()
    @Field(() => Date, {
        nullable: true,
        description: 'ISO 8601. Start updated_at date',
    })
    start_updated_at?: Date;

    @IsOptional()
    @IsDate()
    @Field(() => Date, {
        nullable: true,
        description: 'ISO 8601. End updated_at date',
    })
    end_updated_at?: Date;
}
