import { Arg, FieldResolver, Resolver } from 'type-graphql';
import { AnimeQueryType, AnimeRootResolver } from './anime-root.resolver';
import { CreateAnimeResultsType } from "../results/create-anime-results.type";

@Resolver(AnimeQueryType)
export class AnimeQueryResolver extends AnimeRootResolver {
    constructor() {
        super();
    }

    @FieldResolver(() => CreateAnimeResultsType)
    async getAnime(@Arg('id') id: string): Promise<CreateAnimeResultsType> {
        const anime = await this.prisma.anime.findFirst({
            where: {
                id,
            }
        })
        if (!anime){
            return {
                success: false,
                anime: null,
                errors: ['test error']
            }
        }
        return {
            success: true,
            anime,
            errors: []
        }
    }
}
