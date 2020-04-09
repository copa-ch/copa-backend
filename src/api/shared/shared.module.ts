import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common"
import { LoggerMiddleware } from "./middlewares/logger.middleware"

@Module({
  imports: [],
  controllers: [],
  providers: [],
})
export class SharedModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("*")
  }
}
