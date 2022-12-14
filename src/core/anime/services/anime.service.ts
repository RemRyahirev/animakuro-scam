import Database from "../../../database";
import { CreateAnimeInputType } from "../inputs/create-anime-input.type";
import { Anime } from "../schemas/anime.schema";

export class AnimeService {
    private readonly prisma = Database.getInstance().logic;

    async createAnime(args: CreateAnimeInputType): Promise<Anime> {
        return await this.prisma.anime.create({
            data: args,
        });
    }
}
