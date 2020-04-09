import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { TeamRepository } from "./team.repository"
import { TeamService } from "./team.service"
import { TeamController } from "./team.controller"
import { TournamentModule } from "../tournament/tournament.module"

@Module({
  imports: [TournamentModule, TypeOrmModule.forFeature([TeamRepository])],
  controllers: [TeamController],
  providers: [TeamService],
  exports: [TeamService],
})
export class TeamModule {}
