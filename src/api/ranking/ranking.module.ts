import { Module } from "@nestjs/common"
import { RankingService } from "./ranking.service"
import { RankingController } from "./ranking.controller"
import { GameModule } from "../game/game.module"
import { TeamModule } from "../team/team.module"
import { TournamentModule } from "../tournament/tournament.module"

@Module({
  imports: [TournamentModule, GameModule, TeamModule],
  controllers: [RankingController],
  providers: [RankingService],
})
export class RankingModule {}
