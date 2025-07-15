import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class UsuariosService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createUsuarioDto: CreateUsuarioDto): Promise<{
        nome: string;
        idOng: number | null;
        id: number;
        email: string;
        create_at: Date | null;
        update_at: Date | null;
        senha: string;
    }>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<({
        ong: {
            nome: string;
        } | null;
    } & {
        nome: string;
        idOng: number | null;
        id: number;
        email: string;
        create_at: Date | null;
        update_at: Date | null;
        senha: string;
    })[]>;
    findOne(id: number): Promise<{
        ong: {
            nome: string;
        } | null;
    } & {
        nome: string;
        idOng: number | null;
        id: number;
        email: string;
        create_at: Date | null;
        update_at: Date | null;
        senha: string;
    }>;
    update(id: number, updateUsuarioDto: UpdateUsuarioDto): Promise<{
        nome: string;
        idOng: number | null;
        id: number;
        email: string;
        create_at: Date | null;
        update_at: Date | null;
        senha: string;
    }>;
    remove(id: number): Promise<{
        nome: string;
        idOng: number | null;
        id: number;
        email: string;
        create_at: Date | null;
        update_at: Date | null;
        senha: string;
    }>;
}
