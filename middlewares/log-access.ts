import { Service } from "typedi";
import { MiddlewareInterface, NextFn, ResolverData } from "type-graphql";

import { Context } from "../authorization/contex.interface";
import { Logger } from "../authorization/logger";

@Service()
export class LogAccessMiddleware implements MiddlewareInterface<Context> {
  constructor(private readonly logger: Logger) {}

  async use({ context, info }: ResolverData<Context>, next: NextFn) {
    this.logger.log(
      `Logging access: ${context.user?.name} -> ${info.parentType.name}.${info.fieldName}`,
    );
    return next();
  }
}