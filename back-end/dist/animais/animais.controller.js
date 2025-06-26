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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimaisController = void 0;
const common_1 = require("@nestjs/common");
const animais_service_1 = require("./animais.service");
const create_animai_dto_1 = require("./dto/create-animai.dto");
const update_animai_dto_1 = require("./dto/update-animai.dto");
let AnimaisController = class AnimaisController {
    animaisService;
    constructor(animaisService) {
        this.animaisService = animaisService;
    }
    create(createAnimaiDto) {
        return this.animaisService.create(createAnimaiDto);
    }
    findAll() {
        return this.animaisService.findAll();
    }
    findOne(id) {
        return this.animaisService.findOne(+id);
    }
    update(id, updateAnimaiDto) {
        return this.animaisService.update(+id, updateAnimaiDto);
    }
    remove(id) {
        return this.animaisService.remove(+id);
    }
};
exports.AnimaisController = AnimaisController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_animai_dto_1.CreateAnimaiDto]),
    __metadata("design:returntype", void 0)
], AnimaisController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AnimaisController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AnimaisController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_animai_dto_1.UpdateAnimaiDto]),
    __metadata("design:returntype", void 0)
], AnimaisController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AnimaisController.prototype, "remove", null);
exports.AnimaisController = AnimaisController = __decorate([
    (0, common_1.Controller)('animais'),
    __metadata("design:paramtypes", [animais_service_1.AnimaisService])
], AnimaisController);
//# sourceMappingURL=animais.controller.js.map