"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateOngDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_ong_dto_1 = require("./create-ong.dto");
class UpdateOngDto extends (0, mapped_types_1.PartialType)(create_ong_dto_1.CreateOngDto) {
}
exports.UpdateOngDto = UpdateOngDto;
//# sourceMappingURL=update-ong.dto.js.map