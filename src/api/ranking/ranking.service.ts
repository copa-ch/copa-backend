import { Injectable, Logger } from "@nestjs/common"
import { Ranking } from "./ranking"
import { GameService } from "../game/game.service"
import { TeamService } from "../team/team.service"
import { TournamentService } from "../tournament/tournament.service"

@Injectable()
export class RankingService {
  private readonly logger = new Logger(RankingService.name)

  constructor(
    private readonly tournamentService: TournamentService,
    private readonly gameService: GameService,
    private readonly teamService: TeamService,
  ) {}

  async build(hash: string): Promise<Ranking[]> {
    const tournament = await this.tournamentService.findOneByHash(hash)
    const teams = await this.teamService.findAll(tournament)
    const games = await this.gameService.findAll(tournament)
    return teams
      .map((team) => new Ranking(team))
      .map((ranking) => {
        const hostGames = games.filter(
          (game) => game.host.id === ranking.team.id && game.wasPlayed(),
        )
        const guestGames = games.filter(
          (game) => game.guest.id === ranking.team.id && game.wasPlayed(),
        )
        ranking.played = hostGames.length + guestGames.length

        const hostWins = hostGames.filter((g) => g.didHostWin()).length
        const guestWins = guestGames.filter((g) => g.didGuestWin()).length
        const draws =
          hostGames.filter((g) => g.isADraw()).length +
          guestGames.filter((g) => g.isADraw()).length
        ranking.won = hostWins + guestWins
        ranking.drawn = draws
        ranking.lost = ranking.played - ranking.won - ranking.drawn
        ranking.points = ranking.won * 3 + ranking.drawn

        const hostGoals = hostGames
          .map((g) => g.hostScore)
          .reduce((acc, score) => acc + score, 0)
        const guestGoals = guestGames
          .map((g) => g.guestScore)
          .reduce((acc, score) => acc + score, 0)
        ranking.goals = hostGoals + guestGoals

        const hostGoalsAgainst = hostGames
          .map((g) => g.guestScore)
          .reduce((acc, score) => acc + score, 0)
        const guestGoalsAgainst = guestGames
          .map((g) => g.hostScore)
          .reduce((acc, score) => acc + score, 0)
        ranking.goalsAgainst = hostGoalsAgainst + guestGoalsAgainst
        ranking.goalsDifference = ranking.goals - ranking.goalsAgainst
        return ranking
      })
      .sort((a, b) => a.compare(b))
      .reduce<Ranking[]>((acc, currentRanking, index) => {
        if (index > 0) {
          const lastRanking = acc[index - 1]
          currentRanking.position = lastRanking.position
          if (lastRanking.compare(currentRanking) !== 0) {
            currentRanking.position++
          }
        }
        acc.push(currentRanking)
        return acc
      }, [])
  }
}
