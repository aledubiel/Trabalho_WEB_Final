"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OngsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let OngsService = class OngsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createOngDto) {
        return await this.prisma.ong.create({
            data: createOngDto,
        });
    }
    findAll() {
        return this.prisma.ong.findMany({
            include: {
                animais: {
                    select: {
                        id: true,
                        nome: true,
                        especie: true,
                    },
                },
                usuarios: {
                    select: {
                        id: true,
                        nome: true,
                        email: true,
                    },
                },
            },
        });
    }
    async findOne(id) {
        const ong = await this.prisma.ong.findUnique({
            where: { id },
            include: {
                animais: {
                    select: {
                        id: true,
                        nome: true,
                        especie: true,
                    },
                },
                usuarios: {
                    select: {
                        id: true,
                        nome: true,
                        email: true,
                    },
                },
            },
        });
        if (!ong) {
            throw new common_1.NotFoundException(`ONG com ID ${id} não encontrada.`);
        }
        return ong;
    }
    async update(id, updateOngDto) {
        await this.findOne(id);
        return await this.prisma.ong.update({
            where: { id },
            data: updateOngDto,
        });
    }
    async remove(id) {
        await this.findOne(id);
        ;
        return await this.prisma.ong.delete({
            where: { id },
        });
    }
};
exports.OngsService = OngsService;
exports.OngsService = OngsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OngsService);
//# sourceMappingURL=ongs.service.js.map