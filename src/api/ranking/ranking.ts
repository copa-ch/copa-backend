import { Team } from "../team/team.entity"

export class Ranking {
  position: number
  played: number
  won: number
  drawn: number
  lost: number
  goals: number
  goalsAgainst: number
  goalsDifference: number
  points: number

  constructor(public team: Team) {
    this.position = 1
    this.played = 0
    this.won = 0
    this.drawn = 0
    this.lost = 0
    this.goals = 0
    this.goalsAgainst = 0
    this.goalsDifference = 0
    this.points = 0
  }

  compare(ranking: Ranking) {
    if (this.points < ranking.points) {
      return 1
    }
    if (this.points > ranking.points) {
      return -1
    }

    if (this.goals < ranking.goals) {
      return 1
    }
    if (this.goals > ranking.goals) {
      return -1
    }

    if (this.goalsAgainst > ranking.goalsAgainst) {
      return 1
    }
    if (this.goalsAgainst < ranking.goalsAgainst) {
      return -1
    }

    return 0
  }
}
