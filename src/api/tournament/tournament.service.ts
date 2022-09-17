import { Injectable, NotFoundException } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import * as shortid from "shortid"
import { TournamentRepository } from "./tournament.repository"
import { MailService } from "../../mail/mail.service"
import { Tournament } from "./tournament.entity"
import { CreateTournamentDto } from "./dto/create-tournament.dto"
import { TournamentState } from "./tournament-state"
import { TournamentCreatedMail } from "./tournament-created.mail"
import { UpdateTournamentDto } from "./dto/update-tournament.dto"
import { IllegalTournamentStateException } from "../shared/error/illegal-tournament-state.exception"

@Injectable()
export class TournamentService {
  constructor(
    private readonly tournamentRepository: TournamentRepository,
    private readonly mailService: MailService,
    private readonly configService: ConfigService,
  ) {}

  findOneByHash(hash: string): Promise<Tournament> {
    return this.tournamentRepository.findOneByHash(hash)
  }

  async findOneByHashOrFail(hash: string): Promise<Tournament> {
    const tournament = await this.findOneByHash(hash)
    if (tournament === undefined) {
      throw new NotFoundException()
    }
    return tournament
  }

  findOneByAdminHash(hash: string): Promise<Tournament> {
    return this.tournamentRepository.findOneByAdminHash(hash)
  }

  async findOneByAdminHashOrFail(hash: string): Promise<Tournament> {
    const tournament = await this.findOneByAdminHash(hash)
    if (tournament === undefined) {
      throw new NotFoundException()
    }
    return tournament
  }

  async create(createTournamentDto: CreateTournamentDto): Promise<Tournament> {
    const tournament = new Tournament()
    tournament.name = createTournamentDto.name
    tournament.owner = createTournamentDto.owner
    tournament.state = TournamentState.Open
    const createdTournament = await this.tournamentRepository.save(tournament)
    await this.mailService.send(
      new TournamentCreatedMail(
        createdTournament,
        this.configService.get("app.clientUrl"),
      ),
      createTournamentDto.email,
    )
    return createdTournament
  }

  async update(
    hash: string,
    updateTournamentDto: UpdateTournamentDto,
  ): Promise<Tournament> {
    const tournament = await this.findOneByAdminHash(hash)
    if (
      updateTournamentDto.state &&
      tournament.state !== updateTournamentDto.state
    ) {
      if (
        tournament.state === TournamentState.Open &&
        updateTournamentDto.state !== TournamentState.Playable
      ) {
        throw new IllegalTournamentStateException("Illegal state change")
      }
      if (
        tournament.state === TournamentState.Playable &&
        updateTournamentDto.state !== TournamentState.Closed
      ) {
        throw new IllegalTournamentStateException("Illegal state change")
      }
      if (tournament.state === TournamentState.Closed) {
        throw new IllegalTournamentStateException("Illegal state change")
      }
    }
    tournament.name = updateTournamentDto.name || tournament.name
    tournament.owner = updateTournamentDto.owner || tournament.owner
    tournament.state = updateTournamentDto.state || tournament.state
    return await this.tournamentRepository.save(tournament)
  }

  async deleteByAdminHash(hash: string): Promise<void> {
    const tournament = await this.findOneByAdminHash(hash)
    await this.tournamentRepository.delete(tournament.id)
  }
}
