import { ArgsType, Field } from '@nestjs/graphql';
import { IsDate, IsOptional, IsString } from '@nestjs/class-validator';
import { GetAiringScheduleSortField } from '../enums/get-airing-schedule-sort-field.enum';
import { SortOrder } from '../../../../common/models/enums/sort-order.enum';

@ArgsType()
export class GetListAiringScheduleInput {
    @IsOptional()
    @IsString()
    @Field(() => GetAiringScheduleSortField, {
        nullable: true,
        description: 'Field for sorting',
    })
    sort_field?: GetAiringScheduleSortField;

    @IsOptional()
    @IsString()
    @Field(() => SortOrder, { nullable: true, description: 'Sort order' })
    sort_order?: SortOrder;

    @IsOptional()
    @IsDate()
    @Field(() => Date, {
        nullable: true,
        description: 'ISO 8601. Start airing_at date',
    })
    start_airing_at?: Date;

    @IsOptional()
    @IsDate()
    @Field(() => Date, {
        nullable: true,
        description: 'ISO 8601. End airing_at date',
    })
    end_airing_at?: Date;
}
