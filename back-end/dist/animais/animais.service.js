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
exports.AnimaisService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let AnimaisService = class AnimaisService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createAnimaiDto) {
        return await this.prisma.animal.create({
            data: createAnimaiDto
        });
    }
    findAll() {
        return this.prisma.animal.findMany();
    }
    findOne(id) {
        return `This action returns a #${id} animai`;
    }
    update(id, updateAnimaiDto) {
        return `This action updates a #${id} animai`;
    }
    remove(id) {
        return `This action removes a #${id} animai`;
    }
};
exports.AnimaisService = AnimaisService;
exports.AnimaisService = AnimaisService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AnimaisService);
//# sourceMappingURL=animais.service.js.map