import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { TournamentRepository } from "./tournament.repository"
import { TournamentController } from "./tournament.controller"
import { TournamentService } from "./tournament.service"
import { MailModule } from "../../mail/mail.module"

@Module({
  imports: [MailModule, TypeOrmModule.forFeature([TournamentRepository])],
  controllers: [TournamentController],
  providers: [TournamentService],
  exports: [TournamentService],
})
export class TournamentModule {}
