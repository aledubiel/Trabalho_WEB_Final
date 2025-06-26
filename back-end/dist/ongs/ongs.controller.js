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
exports.OngsController = void 0;
const common_1 = require("@nestjs/common");
const ongs_service_1 = require("./ongs.service");
const create_ong_dto_1 = require("./dto/create-ong.dto");
const update_ong_dto_1 = require("./dto/update-ong.dto");
let OngsController = class OngsController {
    ongsService;
    constructor(ongsService) {
        this.ongsService = ongsService;
    }
    create(createOngDto) {
        return this.ongsService.create(createOngDto);
    }
    findAll() {
        return this.ongsService.findAll();
    }
    findOne(id) {
        return this.ongsService.findOne(+id);
    }
    update(id, updateOngDto) {
        return this.ongsService.update(+id, updateOngDto);
    }
    remove(id) {
        return this.ongsService.remove(+id);
    }
};
exports.OngsController = OngsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_ong_dto_1.CreateOngDto]),
    __metadata("design:returntype", void 0)
], OngsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], OngsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OngsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_ong_dto_1.UpdateOngDto]),
    __metadata("design:returntype", void 0)
], OngsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OngsController.prototype, "remove", null);
exports.OngsController = OngsController = __decorate([
    (0, common_1.Controller)('ongs'),
    __metadata("design:paramtypes", [ongs_service_1.OngsService])
], OngsController);
//# sourceMappingURL=ongs.controller.js.map