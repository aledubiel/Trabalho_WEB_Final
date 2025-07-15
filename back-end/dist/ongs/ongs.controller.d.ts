import { CreateOngDto } from './dto/create-ong.dto';
import { UpdateOngDto } from './dto/update-ong.dto';
import { OngsService } from './ongs.service';
export declare class OngsController {
    private readonly ongsService;
    constructor(ongsService: OngsService);
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
    findOne(id: string): Promise<{
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
    update(id: string, updateOngDto: UpdateOngDto): Promise<{
        nome: string;
        id: number;
        CNPJ: string;
        telefone: string;
        email: string;
        create_at: Date;
        update_at: Date;
    }>;
    remove(id: string): Promise<{
        nome: string;
        id: number;
        CNPJ: string;
        telefone: string;
        email: string;
        create_at: Date;
        update_at: Date;
    }>;
}
