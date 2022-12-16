import Database from '../../../database';
import { CreateAuthorInputType } from '../models/inputs/create-author-input.type';
import { UpdateAuthorInputType } from '../models/inputs/update-author-input.type';
import { PaginationInputType } from '../../../common/models/inputs';
import { Author } from '../models/author.model';

export class AuthorService {
    private readonly prisma = Database.getInstance().logic;

    async getAuthor(id: string): Promise<Author | null> {
        return await this.prisma.author.findUnique({
            where: {
                id,
            },
        });
    }

    async getAuthorList(args: PaginationInputType): Promise<Author[]> {
        return await this.prisma.author.findMany({
            skip: (args.page - 1) * args.perPage,
            take: args.perPage,
        });
    }

    async createAuthor(args: CreateAuthorInputType): Promise<Author> {
        return await this.prisma.author.create({
            data: args,
        });
    }

    async updateAuthor(args: UpdateAuthorInputType): Promise<Author> {
        return await this.prisma.author.update({
            where: { id: args.id },
            data: args,
        });
    }

    async deleteAuthor(id: string) {
        return await this.prisma.author.delete({
            where: { id },
        });
    }
}
