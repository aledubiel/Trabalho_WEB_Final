import { CreateOngDto } from './dto/create-ong.dto';
import { UpdateOngDto } from './dto/update-ong.dto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class OngsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createOngDto: CreateOngDto): Promise<{
        id: number;
        nome: string;
        CNPJ: string;
        telefone: string;
        email: string;
        create_at: Date;
        update_at: Date;
    }>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateOngDto: UpdateOngDto): string;
    remove(id: number): string;
}
