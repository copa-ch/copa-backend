import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { GameRepository } from "./game.repository"
import { GameService } from "./game.service"
import { GameController } from "./game.controller"
import { TournamentModule } from "../tournament/tournament.module"

@Module({
  imports: [TournamentModule, TypeOrmModule.forFeature([GameRepository])],
  controllers: [GameController],
  providers: [GameService],
  exports: [GameService],
})
export class GameModule {}
