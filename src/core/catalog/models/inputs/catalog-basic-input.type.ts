import { ArgsType, Field } from "@nestjs/graphql";
import { IsOptional, IsString, Length } from "class-validator";
import { SortOrder } from "../../../../common/models/enums/sort-order.enum";

@ArgsType()
export class CatalogBasicInputType {
    @IsOptional()
    @IsString()
    @Length(1, 100)
    @Field(() => String, { nullable: true })
    search?: string;

    @IsOptional()
    @IsString()
    @Field(() => SortOrder, { nullable: true })
    sortOrder?: SortOrder
}
