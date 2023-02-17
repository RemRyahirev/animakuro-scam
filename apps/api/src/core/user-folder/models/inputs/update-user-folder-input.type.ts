import { IsOptional, IsString, IsUUID } from 'class-validator';
import { Length } from '@nestjs/class-validator';
import { ArgsType, Field, ID } from '@nestjs/graphql';

@ArgsType()
export class UpdateUserFolderInputType {
    @IsUUID()
    @Field(() => ID)
    id: string;

    @IsOptional()
    @IsString()
    @Length(1, 25)
    @Field(() => String, {
        nullable: true,
    })
    name: string;

    @IsOptional()
    @IsString()
    @Field(() => String, { nullable: true })
    description: string;

    @IsOptional()
    @IsUUID(4, { each: true })
    @Field(() => [ID], { nullable: true })
    animes_add: string;

    @IsOptional()
    @IsUUID(4, { each: true })
    @Field(() => [ID], { nullable: true })
    animes_remove: string;

    @IsOptional()
    @Field(() => Boolean, { nullable: true })
    is_statistic_active: boolean;
    /*@IsOptional()
    @IsNumber()
    @Field(() => Int, { nullable: true,
        description: "какой эпизод(серию)"})
    episode?: number

    @IsOptional()
    @IsNumber()
    @Field(() => Int, {nullable: true,
        description: "секунды: продолжительность этого эпизода"})
    episode_duration?: number

    @IsOptional()
    @IsNumber()
    @Field(() => Int, {nullable: true,
        description: "секунды: сколько просмотрел из этой серии"})
    watched_duration?: number*/
}
