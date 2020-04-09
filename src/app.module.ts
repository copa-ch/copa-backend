import { Module } from "@nestjs/common"
import { ConfigModule } from "./config/config.module"
import { DatabaseModule } from "./database/database.module"
import { ApiModule } from "./api/api.module"

@Module({
  imports: [ConfigModule, DatabaseModule, ApiModule],
})
export class AppModule {}
