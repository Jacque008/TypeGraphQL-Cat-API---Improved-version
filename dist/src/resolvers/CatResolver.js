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
exports.CatResolver = void 0;
const typedi_1 = require("typedi");
const type_graphql_1 = require("type-graphql");
const resource_resolver_1 = require("../../resource/resource.resolver");
const CatType_1 = require("./CatType");
const cats = [{
        "id": 1,
        "name": "Katty",
        "age": 1,
        "breed": "Siamese",
        "color": "black",
        "energylevel": 1,
        "temperament": [
            "Active",
            "Gentle"
        ]
    },
    {
        "id": 2,
        "name": "",
        "age": 2,
        "breed": "Persian",
        "color": "white",
        "energylevel": 2,
        "temperament": [
            "Energetic",
            "Intelligent"
        ]
    },
    {
        "id": 3,
        "name": "rtghtnr",
        "age": 3,
        "breed": "Maine Coon",
        "color": "grey",
        "energylevel": 2,
        "temperament": [
            "Active",
            "Energetic"
        ]
    },
    {
        "id": 4,
        "name": "fdgdf",
        "age": 1,
        "breed": "Scottish Fold",
        "color": "ginger",
        "energylevel": 1,
        "temperament": [
            "Independent",
            "Intelligent"
        ]
    },
    {
        "id": 5,
        "name": "erth",
        "age": 2,
        "breed": "Bengal",
        "color": "tabby ",
        "energylevel": 2,
        "temperament": [
            "Independent",
            "Gentle"
        ]
    }
];
let CatResolver = class CatResolver extends (0, resource_resolver_1.ResourceResolver)(CatType_1.Cat, cats) {
    // here you can add resource-specific operations
    feedCat(id) {
        const found = this.resourceService.getOne(id);
        if (!found) {
            return found;
        }
        found.energylevel++;
        this.resourceService.remove(id);
        const created = this.resourceService.create(found);
        return created;
    }
};
__decorate([
    (0, type_graphql_1.Authorized)("ADMIN"),
    (0, type_graphql_1.Mutation)(type => CatType_1.Cat),
    __param(0, (0, type_graphql_1.Arg)("id", type => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Object)
], CatResolver.prototype, "feedCat", null);
CatResolver = __decorate([
    (0, type_graphql_1.Resolver)(),
    (0, typedi_1.Service)()
], CatResolver);
exports.CatResolver = CatResolver;
//# sourceMappingURL=CatResolver.js.map