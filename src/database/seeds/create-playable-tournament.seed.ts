import { Factory, Seeder } from "typeorm-seeding"
import { Tournament } from "../../api/tournament/tournament.entity"
import { TournamentState } from "../../api/tournament/tournament-state"
import { Team } from "../../api/team/team.entity"
import { Game } from "../../api/game/game.entity"

export class CreatePlayableTournament implements Seeder {
  public async run(factory: Factory): Promise<void> {
    const tournament = await factory(Tournament)()
      .map(async t => {
        t.state = TournamentState.Playable
        return t
      })
      .seed()
    const teams = await factory(Team)()
      .map(async team => {
        team.tournament = tournament
        return team
      })
      .seedMany(4)

    const gamePlans = [
      [1, 0, 1],
      [1, 2, 3],
      [2, 0, 2],
      [2, 1, 3],
      [3, 3, 0],
      [3, 1, 2],
    ]

    for (const plan of gamePlans) {
      await factory(Game)()
        .map(async game => {
          game.tournament = tournament
          game.round = plan[0]
          game.host = teams[plan[1]]
          game.guest = teams[plan[2]]
          return game
        })
        .seed()
    }
  }
}
