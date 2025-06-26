"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OngsModule = void 0;
const common_1 = require("@nestjs/common");
const ongs_service_1 = require("./ongs.service");
const ongs_controller_1 = require("./ongs.controller");
const prisma_module_1 = require("../prisma/prisma.module");
let OngsModule = class OngsModule {
};
exports.OngsModule = OngsModule;
exports.OngsModule = OngsModule = __decorate([
    (0, common_1.Module)({
        controllers: [ongs_controller_1.OngsController],
        providers: [ongs_service_1.OngsService],
        imports: [prisma_module_1.PrismaModule]
    })
], OngsModule);
//# sourceMappingURL=ongs.module.js.map