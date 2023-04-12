import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { Container } from "typedi";
import path from "node:path";
import { buildSchema } from "type-graphql";
import { authChecker } from "./authorization/auth-checker";
import { CatResolver } from "./src/resolvers/CatResolver";
import { Context } from "./authorization/contex.interface";
import { ErrorLoggerMiddleware} from "./middlewares/error-logger"
import { ResolveTimeMiddleware} from "./middlewares/resolve-time"


async function bootstrap() {
  // build TypeGraphQL executable schema
  const schema = await buildSchema({
    resolvers: [CatResolver],
    emitSchemaFile: path.resolve(__dirname, "schema.gql"),
    globalMiddlewares: [ErrorLoggerMiddleware, ResolveTimeMiddleware],
    container: Container,
    authChecker,
  });

  // Create GraphQL server
  const server = new ApolloServer({ schema,
    context: () => {
      const ctx: Context = {
        // create mocked user in context
        // in real app you would be mapping user from `req.user` or sth
        user: {
          id: 1,
          name: "Sample user",
          roles: ["ADMIN"],
        },
      };
      return ctx;
    },
  }); 

  // Start the server
  const { url } = await server.listen(4000);
  console.log(`Server is running, GraphQL Playground available at ${url}`);
}

bootstrap();