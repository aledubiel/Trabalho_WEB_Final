import { CreateOngDto } from './dto/create-ong.dto';
import { UpdateOngDto } from './dto/update-ong.dto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class OngsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createOngDto: CreateOngDto): Promise<{
        nome: string;
        id: number;
        CNPJ: string;
        telefone: string;
        email: string;
        create_at: Date;
        update_at: Date;
    }>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<({
        animais: {
            especie: string;
            nome: string;
            id: number;
        }[];
        usuarios: {
            nome: string;
            id: number;
            email: string;
        }[];
    } & {
        nome: string;
        id: number;
        CNPJ: string;
        telefone: string;
        email: string;
        create_at: Date;
        update_at: Date;
    })[]>;
    findOne(id: number): Promise<{
        animais: {
            especie: string;
            nome: string;
            id: number;
        }[];
        usuarios: {
            nome: string;
            id: number;
            email: string;
        }[];
    } & {
        nome: string;
        id: number;
        CNPJ: string;
        telefone: string;
        email: string;
        create_at: Date;
        update_at: Date;
    }>;
    update(id: number, updateOngDto: UpdateOngDto): Promise<{
        nome: string;
        id: number;
        CNPJ: string;
        telefone: string;
        email: string;
        create_at: Date;
        update_at: Date;
    }>;
    remove(id: number): Promise<{
        nome: string;
        id: number;
        CNPJ: string;
        telefone: string;
        email: string;
        create_at: Date;
        update_at: Date;
    }>;
}
