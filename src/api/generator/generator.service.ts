import { Injectable, Logger } from "@nestjs/common"
import { Transaction } from "typeorm"
import { shuffle } from "lodash"
import { PairingTableService } from "./paring-table.service"
import { Tournament } from "../tournament/tournament.entity"
import { Game } from "../game/game.entity"
import { TournamentState } from "../tournament/tournament-state"
import { IlegalTournamentStateException } from "../shared/error/ilegal-tournament-state.exception"
import { Team } from "../team/team.entity"
import { TeamService } from "../team/team.service"

@Injectable()
export class GeneratorService {
  private readonly logger = new Logger(GeneratorService.name)

  constructor(
    private readonly pairingTableService: PairingTableService,
    private readonly teamService: TeamService,
  ) {}

  @Transaction()
  async generateGames(tournament: Tournament): Promise<Game[]> {
    if (tournament.state !== TournamentState.Planable) {
      throw new IlegalTournamentStateException(
        "A schedule can only be generaten during the open state of the Tournament",
      )
    }
    this.logger.log(`generate(tournament.id=${tournament.id}`)
    const teams: Team[] = shuffle(await this.teamService.findAll(tournament))
    this.logger.log(`found ${teams.length} teams`)

    const paringTable = this.pairingTableService.generate({
      numberOfTeams: teams.length,
    })
    const games = []
    paringTable.rounds.forEach(round => {
      round.fixtures.forEach(fixture => {
        const game = new Game()
        game.tournament = tournament
        game.round = round.index + 1
        game.host = teams[fixture.host]
        game.guest = teams[fixture.guest]
        games.push(game)
      })
    })
    return games
  }
}
