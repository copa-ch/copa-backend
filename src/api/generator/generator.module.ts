import { Module } from "@nestjs/common"
import { PairingTableService } from "./paring-table.service"
import { GeneratorService } from "./generator.service"
import { TournamentModule } from "../tournament/tournament.module"
import { TeamModule } from "../team/team.module"
import { GeneratorController } from "./generator.controller"

@Module({
  imports: [TournamentModule, TeamModule],
  controllers: [GeneratorController],
  providers: [PairingTableService, GeneratorService],
  exports: [GeneratorService],
})
export class GeneratorModule {}
