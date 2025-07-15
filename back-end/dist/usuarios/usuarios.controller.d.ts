import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
export declare class UsuariosController {
    private readonly usuariosService;
    constructor(usuariosService: UsuariosService);
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
    findOne(id: string): Promise<{
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
    update(id: string, updateUsuarioDto: UpdateUsuarioDto): Promise<{
        nome: string;
        idOng: number | null;
        id: number;
        email: string;
        create_at: Date | null;
        update_at: Date | null;
        senha: string;
    }>;
    remove(id: string): Promise<{
        nome: string;
        idOng: number | null;
        id: number;
        email: string;
        create_at: Date | null;
        update_at: Date | null;
        senha: string;
    }>;
}
