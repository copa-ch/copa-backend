import { Injectable, Logger } from "@nestjs/common"
import { GameRepository } from "./game.repository"
import { Tournament } from "../tournament/tournament.entity"
import { Game } from "./game.entity"
import { UpdateGameDto } from "./dto/update-game.dto"
import { TournamentState } from "../tournament/tournament-state"
import { IllegalTournamentStateException } from "../shared/error/illegal-tournament-state.exception"
import { CreateGameDto } from "./dto/create-game.dto"
import { Connection } from "typeorm"
import { plainToClass } from "class-transformer"
import { Team } from "../team/team.entity"

@Injectable()
export class GameService {
  private readonly logger = new Logger(GameService.name)

  constructor(
    private readonly gameRepository: GameRepository,
    private readonly connection: Connection,
  ) {}

  findAll(tournament: Tournament): Game[] | PromiseLike<Game[]> {
    return this.gameRepository.findAll(tournament)
  }

  findOne(id: string): Promise<Game> {
    return this.gameRepository.findOneOrFail(id, {
      relations: ["host", "guest"],
    })
  }

  async create(
    tournament: Tournament,
    createGameDtos: CreateGameDto[],
  ): Promise<Game[]> {
    const games = createGameDtos.map((g) => {
      const game = new Game()
      game.tournament = tournament
      game.round = g.round
      game.host = plainToClass(Team, g.host)
      game.guest = plainToClass(Team, g.guest)
      return game
    })

    const queryRunner = this.connection.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()
    try {
      const gamesToDelete = await queryRunner.manager.find(Game, {
        where: { tournament },
      })
      await queryRunner.manager.remove(gamesToDelete)
      await queryRunner.manager.save(games)
      await queryRunner.commitTransaction()
    } catch (err) {
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction()
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release()
    }
    return []
  }

  async update(
    tournament: Tournament,
    id: string,
    updateGameDto: UpdateGameDto,
  ): Promise<Game> {
    this.verifyChange(tournament)
    const game = await this.findOne(id)
    game.hostScore = updateGameDto.hostScore
    game.guestScore = updateGameDto.guestScore
    return await this.gameRepository.save(game)
  }

  async removeAll(tournament: Tournament): Promise<void> {
    const games = await this.findAll(tournament)
    this.gameRepository.remove(games)
  }

  private verifyChange(tournament: Tournament) {
    if (tournament.state !== TournamentState.Playable) {
      throw new IllegalTournamentStateException(
        "Games can only be update during the Playable state",
      )
    }
  }
}
