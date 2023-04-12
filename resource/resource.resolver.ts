import { Service } from "typedi";
import {
  Query,
  Arg,
  Int,
  Resolver,
  ArgsType,
  Field,
  Args,
  Mutation,
  FieldResolver,
  Root,
  ClassType,
  Authorized
} from "type-graphql";

import { Resource } from "./resource";
import { ResourceService, ResourceServiceFactory } from "./resource.service";
import { CreateInput } from "../src/resolvers/CatType";

@ArgsType()
export class GetAllArgs {
  @Field(type => Int)
  skip!: number;

  @Field(type => Int)
  take!: number;
}

export function ResourceResolver<TResource extends Resource>(
  ResourceCls: ClassType<TResource>,
  resources: TResource[],
) {
  const resourceName = ResourceCls.name.toLocaleLowerCase();

  @Resolver(of => ResourceCls)
  @Service()
  abstract class ResourceResolverClass {
    protected resourceService: ResourceService<TResource>;

    constructor(factory: ResourceServiceFactory) {
      this.resourceService = factory.create(resources);
      console.log(`Created ResourceService for ${resourceName}`);
    }

    @Query(returns => ResourceCls, { name: `${resourceName}` })
    protected async getOne(@Arg("id", type => Int) id: number) {
      return this.resourceService.getOne(id);
    }

    @Query(returns => [ResourceCls], { name: `${resourceName}s` })
    protected async getAll(@Arg("skip", type=>Int) skip: number,
    @Arg("take",type=>Int) take:number) {
      const all = this.resourceService.getAll(skip, take);
      return all;
    }

    // dynamically created field with resolver for all child resource classes
    @FieldResolver({ name: "uuid" })
    protected getUuid(@Root() resource: Resource): string {
      return `${resourceName}_${resource.id}`;
    }

    @Mutation(returns => ResourceCls, { name: `add${resourceName}` })
    protected create(
      // @Args() { name, age, color, breed, energylevel, temperament } : CreateInput ){
      @Arg("name") name: string,
      @Arg("age") age: number,
      @Arg("color") color: string,
      @Arg("breed") breed: string,
      @Arg("energylevel") energylevel: number,
      @Arg("temperament", type => [String]) temperament: string[]      
      ):TResource | undefined{
      var id = resources.length + 1;
      const newResource = { id, name, age, color, breed, energylevel, temperament } ;
      const created = this.resourceService.create(newResource as TResource);
      return created;
    }

    @Authorized()
    @Mutation(returns => ResourceCls, { name: `remove${resourceName}` })
    protected async remove(@Arg("id", type => Int) id: number ): Promise<TResource | undefined>{
      const removed = this.resourceService.remove(id);
      return removed;
    }
  }

  return ResourceResolverClass;
}