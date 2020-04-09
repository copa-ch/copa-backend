import { Module } from "@nestjs/common"
import { APIController } from "./api.controller"
import { TournamentModule } from "./tournament/tournament.module"
import { SharedModule } from "./shared/shared.module"
import { TeamModule } from "./team/team.module"
import { GameModule } from "./game/game.module"
import { RankingModule } from "./ranking/ranking.module"
import { APP_GUARD } from "@nestjs/core"
import { RolesGuard } from "./guard/roles.guard"
import { GeneratorModule } from "./generator/generator.module"

@Module({
  imports: [
    SharedModule,
    GeneratorModule,
    TournamentModule,
    TeamModule,
    GameModule,
    RankingModule,
  ],
  controllers: [APIController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class ApiModule {}
