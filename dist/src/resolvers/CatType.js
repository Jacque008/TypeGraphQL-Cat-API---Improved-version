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
exports.CreateInput = exports.Cat = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const log_access_1 = require("../../middlewares/log-access");
let Cat = class Cat {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, type_graphql_1.Field)(type => type_graphql_1.Int),
    __metadata("design:type", Number)
], Cat.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Authorized)(),
    (0, typeorm_1.Column)(),
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Cat.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, type_graphql_1.UseMiddleware)(log_access_1.LogAccessMiddleware),
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], Cat.prototype, "age", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Cat.prototype, "breed", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Cat.prototype, "color", void 0);
__decorate([
    (0, type_graphql_1.Authorized)("ADMIN"),
    (0, typeorm_1.Column)(),
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], Cat.prototype, "energylevel", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { array: true }),
    (0, type_graphql_1.Field)(() => [String]),
    __metadata("design:type", Array)
], Cat.prototype, "temperament", void 0);
Cat = __decorate([
    (0, typeorm_1.Entity)(),
    (0, type_graphql_1.ObjectType)()
], Cat);
exports.Cat = Cat;
let CreateInput = class CreateInput {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], CreateInput.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], CreateInput.prototype, "age", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], CreateInput.prototype, "breed", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], CreateInput.prototype, "color", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], CreateInput.prototype, "energylevel", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [String]),
    __metadata("design:type", Array)
], CreateInput.prototype, "temperament", void 0);
CreateInput = __decorate([
    (0, type_graphql_1.ArgsType)()
], CreateInput);
exports.CreateInput = CreateInput;
// @ArgsType()
// export class CreateInput {
//   @Field()
//   name!: string;
//   @Field()
//   age!: number;
//   @Field()
//   breed!: string;
//   @Field()
//   color!: string;
//   @Field()
//   energylevel!: number;
//   @Field(() => [String])
//   temperament!: string[];
// }
//# sourceMappingURL=CatType.js.map