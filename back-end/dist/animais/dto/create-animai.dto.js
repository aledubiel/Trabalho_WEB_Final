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
exports.CreateAnimaiDto = void 0;
const class_validator_1 = require("class-validator");
class CreateAnimaiDto {
    especie;
    nome;
    data_nascimento;
    porte;
    sexo;
    descricao;
    idOng;
}
exports.CreateAnimaiDto = CreateAnimaiDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'especie' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAnimaiDto.prototype, "especie", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'nome' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAnimaiDto.prototype, "nome", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'data_nascimento' }),
    __metadata("design:type", Date)
], CreateAnimaiDto.prototype, "data_nascimento", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'porte' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAnimaiDto.prototype, "porte", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'sexo' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAnimaiDto.prototype, "sexo", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'descricao' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAnimaiDto.prototype, "descricao", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'idOng' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateAnimaiDto.prototype, "idOng", void 0);
//# sourceMappingURL=create-animai.dto.js.map