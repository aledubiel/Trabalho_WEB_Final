import { CreateAnimaiDto } from './dto/create-animai.dto';
import { UpdateAnimaiDto } from './dto/update-animai.dto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class AnimaisService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createAnimaiDto: CreateAnimaiDto): Promise<{
        especie: string;
        nome: string;
        data_nascimento: Date;
        porte: string;
        sexo: string;
        descricao: string;
        idOng: number | null;
        id: number;
    }>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<({
        ong: {
            nome: string;
        } | null;
    } & {
        especie: string;
        nome: string;
        data_nascimento: Date;
        porte: string;
        sexo: string;
        descricao: string;
        idOng: number | null;
        id: number;
    })[]>;
    findOne(id: number): Promise<{
        ong: {
            nome: string;
        } | null;
    } & {
        especie: string;
        nome: string;
        data_nascimento: Date;
        porte: string;
        sexo: string;
        descricao: string;
        idOng: number | null;
        id: number;
    }>;
    update(id: number, updateAnimaiDto: UpdateAnimaiDto): Promise<{
        especie: string;
        nome: string;
        data_nascimento: Date;
        porte: string;
        sexo: string;
        descricao: string;
        idOng: number | null;
        id: number;
    }>;
    remove(id: number): Promise<{
        especie: string;
        nome: string;
        data_nascimento: Date;
        porte: string;
        sexo: string;
        descricao: string;
        idOng: number | null;
        id: number;
    }>;
}
