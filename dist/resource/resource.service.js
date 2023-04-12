"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceService = exports.ResourceServiceFactory = void 0;
const typedi_1 = require("typedi");
// we need to use factory as we need separate instance of service for each generic
let ResourceServiceFactory = class ResourceServiceFactory {
    create(resources) {
        return new ResourceService(resources);
    }
};
ResourceServiceFactory = __decorate([
    (0, typedi_1.Service)()
], ResourceServiceFactory);
exports.ResourceServiceFactory = ResourceServiceFactory;
class ResourceService {
    constructor(resources = []) {
        this.resources = resources;
    }
    getOne(id) {
        return this.resources.find(res => res.id === id);
    }
    getAll(skip, take) {
        const start = skip;
        const end = skip + take;
        return this.resources.slice(start, end);
    }
    // id: number, name: string, age: number,color: string, breed: string, energylevel: number,temperament: string[]
    create(input) {
        this.resources.push(input);
        return this.resources.find(res => res.id === input.id);
    }
    remove(id) {
        const item = this.resources.find(res => res.id === id);
        if (!item) {
            return undefined;
        }
        const index = this.resources.indexOf(item);
        if (index > -1) {
            this.resources.splice(index, 1);
            return item;
        }
        else {
            return undefined;
        }
    }
}
exports.ResourceService = ResourceService;
//# sourceMappingURL=resource.service.js.map