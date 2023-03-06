import { IsOptional, IsUUID } from '@nestjs/class-validator';
import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class AnimeAuthorAddInputType {
    /**
     * author_id
     */
    @IsUUID(4, { each: true })
    @Field(() => ID)
    id: string;

    /**
     * author_role_id
     */
    @IsOptional()
    @IsUUID(4, { each: true })
    @Field(() => [ID])
    roles: string[];
}
