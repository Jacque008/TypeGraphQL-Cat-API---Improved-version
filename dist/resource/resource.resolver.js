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
exports.ResourceResolver = exports.GetAllArgs = void 0;
const typedi_1 = require("typedi");
const type_graphql_1 = require("type-graphql");
const resource_service_1 = require("./resource.service");
let GetAllArgs = class GetAllArgs {
};
__decorate([
    (0, type_graphql_1.Field)(type => type_graphql_1.Int),
    __metadata("design:type", Number)
], GetAllArgs.prototype, "skip", void 0);
__decorate([
    (0, type_graphql_1.Field)(type => type_graphql_1.Int),
    __metadata("design:type", Number)
], GetAllArgs.prototype, "take", void 0);
GetAllArgs = __decorate([
    (0, type_graphql_1.ArgsType)()
], GetAllArgs);
exports.GetAllArgs = GetAllArgs;
function ResourceResolver(ResourceCls, resources) {
    const resourceName = ResourceCls.name.toLocaleLowerCase();
    let ResourceResolverClass = class ResourceResolverClass {
        constructor(factory) {
            this.resourceService = factory.create(resources);
            console.log(`Created ResourceService for ${resourceName}`);
        }
        async getOne(id) {
            return this.resourceService.getOne(id);
        }
        async getAll(skip, take) {
            const all = this.resourceService.getAll(skip, take);
            return all;
        }
        // dynamically created field with resolver for all child resource classes
        getUuid(resource) {
            return `${resourceName}_${resource.id}`;
        }
        create(name, age, color, breed, energylevel, temperament) {
            var id = resources.length + 1;
            const newResource = { id, name, age, color, breed, energylevel, temperament };
            const created = this.resourceService.create(newResource);
            return created;
        }
        async remove(id) {
            const removed = this.resourceService.remove(id);
            return removed;
        }
    };
    __decorate([
        (0, type_graphql_1.Query)(returns => ResourceCls, { name: `${resourceName}` }),
        __param(0, (0, type_graphql_1.Arg)("id", type => type_graphql_1.Int)),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number]),
        __metadata("design:returntype", Promise)
    ], ResourceResolverClass.prototype, "getOne", null);
    __decorate([
        (0, type_graphql_1.Query)(returns => [ResourceCls], { name: `${resourceName}s` }),
        __param(0, (0, type_graphql_1.Arg)("skip", type => type_graphql_1.Int)),
        __param(1, (0, type_graphql_1.Arg)("take", type => type_graphql_1.Int)),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number, Number]),
        __metadata("design:returntype", Promise)
    ], ResourceResolverClass.prototype, "getAll", null);
    __decorate([
        (0, type_graphql_1.FieldResolver)({ name: "uuid" }),
        __param(0, (0, type_graphql_1.Root)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", String)
    ], ResourceResolverClass.prototype, "getUuid", null);
    __decorate([
        (0, type_graphql_1.Mutation)(returns => ResourceCls, { name: `add${resourceName}` }),
        __param(0, (0, type_graphql_1.Arg)("name")),
        __param(1, (0, type_graphql_1.Arg)("age")),
        __param(2, (0, type_graphql_1.Arg)("color")),
        __param(3, (0, type_graphql_1.Arg)("breed")),
        __param(4, (0, type_graphql_1.Arg)("energylevel")),
        __param(5, (0, type_graphql_1.Arg)("temperament", type => [String])),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, Number, String, String, Number, Array]),
        __metadata("design:returntype", Object)
    ], ResourceResolverClass.prototype, "create", null);
    __decorate([
        (0, type_graphql_1.Authorized)(),
        (0, type_graphql_1.Mutation)(returns => ResourceCls, { name: `remove${resourceName}` }),
        __param(0, (0, type_graphql_1.Arg)("id", type => type_graphql_1.Int)),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number]),
        __metadata("design:returntype", Promise)
    ], ResourceResolverClass.prototype, "remove", null);
    ResourceResolverClass = __decorate([
        (0, type_graphql_1.Resolver)(of => ResourceCls),
        (0, typedi_1.Service)(),
        __metadata("design:paramtypes", [resource_service_1.ResourceServiceFactory])
    ], ResourceResolverClass);
    return ResourceResolverClass;
}
exports.ResourceResolver = ResourceResolver;
//# sourceMappingURL=resource.resolver.js.map