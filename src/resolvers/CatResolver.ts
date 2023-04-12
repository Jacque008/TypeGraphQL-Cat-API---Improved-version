import { Service } from "typedi";
import { Resolver, Mutation, Arg, ID, Int, Query, Args, Authorized } from "type-graphql";
import { ResourceServiceFactory } from "../../resource/resource.service";
import { ResourceResolver, GetAllArgs } from "../../resource/resource.resolver"
import { Cat, CreateInput } from "./CatType";

const cats: Cat[] = [{
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

@Resolver()
@Service()
export class CatResolver extends ResourceResolver(Cat, cats) {
  // here you can add resource-specific operations

  @Authorized("ADMIN")
  @Mutation(type => Cat)
   feedCat(@Arg("id", type => Int) id: number):Cat|undefined {
        const found = this.resourceService.getOne(id);
        if (!found){
            return found;}
        found.energylevel ++;
        this.resourceService.remove(id);        
        const created = this.resourceService.create(found);
        return created;
    }
}