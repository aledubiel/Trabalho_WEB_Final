import { AnimaisService } from './animais.service';
import { CreateAnimaiDto } from './dto/create-animai.dto';
import { UpdateAnimaiDto } from './dto/update-animai.dto';
export declare class AnimaisController {
    private readonly animaisService;
    constructor(animaisService: AnimaisService);
    create(createAnimaiDto: CreateAnimaiDto): Promise<{
        id: number;
        especie: string;
        nome: string;
        data_nascimento: Date;
        porte: string;
        sexo: string;
        descricao: string;
        idOng: number | null;
    }>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        especie: string;
        nome: string;
        data_nascimento: Date;
        porte: string;
        sexo: string;
        descricao: string;
        idOng: number | null;
    }[]>;
    findOne(id: string): string;
    update(id: string, updateAnimaiDto: UpdateAnimaiDto): string;
    remove(id: string): string;
}
