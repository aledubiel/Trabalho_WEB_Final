import { CreateAnimaiDto } from './dto/create-animai.dto';
import { UpdateAnimaiDto } from './dto/update-animai.dto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class AnimaisService {
    private prisma;
    constructor(prisma: PrismaService);
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
    findOne(id: number): string;
    update(id: number, updateAnimaiDto: UpdateAnimaiDto): string;
    remove(id: number): string;
}
