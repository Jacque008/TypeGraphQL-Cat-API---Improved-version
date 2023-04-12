import { Service } from "typedi";
import { MetadataAlreadyExistsError } from "typeorm";
import { Resource } from "./resource";
import { CreateInput } from "../src/resolvers/CatType"

// we need to use factory as we need separate instance of service for each generic
@Service()
export class ResourceServiceFactory {
  create<TResource extends Resource>(resources?: TResource[]) {
    return new ResourceService(resources);
  }
}

export class ResourceService<TResource extends Resource> {
  constructor(protected resources: TResource[] = []) {}

  getOne(id: number): TResource | undefined {
    return this.resources.find(res => res.id === id);
  }

  getAll(skip: number, take: number): TResource[] {
    const start: number = skip;
    const end: number = skip + take;
    return this.resources.slice(start, end);
  }

  // id: number, name: string, age: number,color: string, breed: string, energylevel: number,temperament: string[]
  create(input: TResource): TResource | undefined {
    this.resources.push(input);
      return this.resources.find(res => res.id === input.id);
  }

  remove(id: number): TResource | undefined {
    const item = this.resources.find(res => res.id === id);
    if (!item) {
      return undefined
      }
    const index = this.resources.indexOf(item);
    if (index > -1) {
     this.resources.splice(index, 1);
     return item
    } else 
    {return undefined}
  }
}