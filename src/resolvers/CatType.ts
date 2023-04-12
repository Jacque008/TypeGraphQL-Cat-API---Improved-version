import { ObjectType, Field, Int, ID, ArgsType, InputType, Authorized, UseMiddleware } from "type-graphql";
import { Resource } from "../../resource/resource";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import {NumberInterceptor} from "../../middlewares/number-interceptor"
import { LogAccessMiddleware} from "../../middlewares/log-access"

@Entity()
@ObjectType()
export class Cat implements Resource {
  @PrimaryGeneratedColumn()
  @Field(type => Int)
  id!: number;

  @Authorized() 
  @Column()
  @Field()
  name!: string;

  @Column()
  @UseMiddleware(LogAccessMiddleware)
  @Field()
  age!: number;

  @Column()
  @Field()
  breed!: string;

  @Column()
  @Field()
  color!: string;

  @Authorized("ADMIN")
  @Column()
  @Field({nullable: true})
  energylevel!: number;

  // @Column()
  // @Field()
  // createdAt!: Date;

  @Column("text", { array: true })
  @Field(() => [String])
  temperament!: string[];
}

@ArgsType()
export class CreateInput implements Partial<Resource> {
  @Field()
  name!: string;

  @Field()
  age!: number;

  @Field()
  breed!: string;

  @Field()
  color!: string;

  @Field()
  energylevel!: number;

  @Field(() => [String])
  temperament!: string[];
}
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