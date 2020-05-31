import { EntityRepository, Repository } from "typeorm"

import { Team } from "./team.entity"
import { Tournament } from "../tournament/tournament.entity"

@EntityRepository(Team)
export class TeamRepository extends Repository<Team> {
  async findAll(tournament: Tournament): Promise<Team[]> {
    // const total = await this.count({ where: { tournament } })
    const teams = await this.find({
      where: {
        tournament,
      },
      order: {
        createdAt:  "ASC"
      }
    })
    return teams
  }

  async countTeamDuplicates(tournament: Tournament, name: string) {
    return this.count({
      where: {
        tournament,
        name,
      },
    })
  }
}
