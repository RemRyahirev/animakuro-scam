import { IsUUID } from '@nestjs/class-validator';
import { ArgsType, Field, ID } from '@nestjs/graphql';

@ArgsType()
export class GetOpeningEndingInputType {
    @Field(() => ID)
    @IsUUID()
    id: string;
}
