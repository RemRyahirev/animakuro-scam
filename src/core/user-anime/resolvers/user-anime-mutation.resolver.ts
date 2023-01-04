import { Arg, Args, Ctx, FieldResolver, Resolver } from 'type-graphql';
import { CreateUserAnimeInputType } from '../models/inputs/create-user-anime-input.type';
import { UserAnimeMutationType, UserAnimeRootResolver } from './user-anime-root.resolver';
import { CreateUserAnimeResultsType } from '../models/results/create-user-anime-results.type';
import { ICustomContext } from '../../../common/models/interfaces';
import { UpdateUserAnimeResultsType } from '../models/results/update-user-anime-results.type';
import { UpdateUserAnimeInputType } from '../models/inputs/update-user-anime-input.type';
import { DeleteUserAnimeResultsType } from '../models/results/delete-user-anime-results.type';

@Resolver(UserAnimeMutationType)
export class UserAnimeMutationResolver extends UserAnimeRootResolver {
    constructor() {
        super();
    }

    @FieldResolver(() => CreateUserAnimeResultsType)
    async createUserAnime(
        @Args() args: CreateUserAnimeInputType,
        @Ctx() ctx: ICustomContext,
    ): Promise<CreateUserAnimeResultsType> {
        return await this.userAnimeService.createUserAnime(args, ctx);
    }

    @FieldResolver(() => UpdateUserAnimeResultsType)
    async updateUserAnime(
        @Args() args: UpdateUserAnimeInputType,
        @Ctx() ctx: ICustomContext,
    ): Promise<UpdateUserAnimeResultsType> {
        return await this.userAnimeService.updateUserAnime(args, ctx);
    }

    @FieldResolver(() => DeleteUserAnimeResultsType)
    async deleteUserAnime(
        @Arg('id') id: string,
        @Ctx() ctx: ICustomContext,
    ): Promise<DeleteUserAnimeResultsType> {
        return await this.userAnimeService.deleteUserAnime(id, ctx);
    }
}
