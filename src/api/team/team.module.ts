import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { TeamRepository } from "./team.repository"
import { TeamService } from "./team.service"
import { TeamController } from "./team.controller"
import { TournamentModule } from "../tournament/tournament.module"
import { GameService } from "../game/game.service"
import { GeneratorService } from "../generator/generator.service"
import { GameRepository } from "../game/game.repository"
import { PairingTableService } from "../generator/paring-table.service"

@Module({
  imports: [
    TournamentModule,
    TypeOrmModule.forFeature([TeamRepository, GameRepository]),
  ],
  controllers: [TeamController],
  providers: [TeamService, GameService, GeneratorService, PairingTableService],
  exports: [TeamService],
})
export class TeamModule {}
