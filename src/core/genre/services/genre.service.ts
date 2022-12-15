import Database from '../../../database';
import { PaginationInputType } from "../../../common/inputs/pagination-input.type";
import { Genre } from "../schemas/genre.schema";
import { CreateGenreInputType } from "../inputs/create-genre-input.type";
import { UpdateGenreInputType } from "../inputs/update-genre-input.type";

export class GenreService {
    private readonly prisma = Database.getInstance().logic;

    async getGenre(id: string): Promise<Genre | null> {
        return await this.prisma.genre.findUnique({
            where: {
                id,
            },
        });
    }

    async getGenreList(args: PaginationInputType): Promise<Genre[]> {
        return await this.prisma.genre.findMany({
            skip: (args.page - 1) * args.perPage,
            take: args.perPage,
        });
    }

    async createGenre(args: CreateGenreInputType): Promise<Genre> {
        return await this.prisma.genre.create({
            data: args,
        });
    }

    async updateGenre(args: UpdateGenreInputType): Promise<Genre> {
        return await this.prisma.genre.update({
            where: { id: args.id },
            data: args,
        });
    }

    async deleteGenre(id: string) {
        return await this.prisma.genre.delete({
            where: { id },
        });
    }
}
