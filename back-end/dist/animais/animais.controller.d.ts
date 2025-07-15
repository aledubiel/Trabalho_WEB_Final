import { AnimaisService } from './animais.service';
import { CreateAnimaiDto } from './dto/create-animai.dto';
import { UpdateAnimaiDto } from './dto/update-animai.dto';
export declare class AnimaisController {
    private readonly animaisService;
    constructor(animaisService: AnimaisService);
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
    findOne(id: string): Promise<{
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
    update(id: string, updateAnimaiDto: UpdateAnimaiDto): Promise<{
        especie: string;
        nome: string;
        data_nascimento: Date;
        porte: string;
        sexo: string;
        descricao: string;
        idOng: number | null;
        id: number;
    }>;
    remove(id: string): Promise<{
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
