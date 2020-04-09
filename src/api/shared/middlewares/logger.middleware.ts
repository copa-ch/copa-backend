import { Injectable, Logger, NestMiddleware } from "@nestjs/common"
import * as morgan from "morgan"

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger(LoggerMiddleware.name)

  use(req: any, res: any, next: () => void) {
    return morgan("dev", {
      stream: {
        write: this.logger.debug.bind(this.logger),
      },
    })(req, res, next)
  }
}
