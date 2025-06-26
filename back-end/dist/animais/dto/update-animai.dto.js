"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAnimaiDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_animai_dto_1 = require("./create-animai.dto");
class UpdateAnimaiDto extends (0, mapped_types_1.PartialType)(create_animai_dto_1.CreateAnimaiDto) {
}
exports.UpdateAnimaiDto = UpdateAnimaiDto;
//# sourceMappingURL=update-animai.dto.js.map