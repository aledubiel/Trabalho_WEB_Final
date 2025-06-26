import { OngsService } from './ongs.service';
import { CreateOngDto } from './dto/create-ong.dto';
import { UpdateOngDto } from './dto/update-ong.dto';
export declare class OngsController {
    private readonly ongsService;
    constructor(ongsService: OngsService);
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
    findOne(id: string): string;
    update(id: string, updateOngDto: UpdateOngDto): string;
    remove(id: string): string;
}
