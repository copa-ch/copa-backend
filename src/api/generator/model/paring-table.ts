import { Round } from "./round"

export class ParingTable {
  numberOfTeams: number
  rounds: Round[] = []

  private numberOfRounds: number
  private numberOfFields: number

  constructor(numberOfTeams: number) {
    this.numberOfTeams = numberOfTeams
    this.numberOfRounds = numberOfTeams - 1
    this.numberOfFields = numberOfTeams / 2

    for (let i = 0; i < this.numberOfRounds; i++) {
      this.rounds.push(new Round(i, this.numberOfFields))
    }
  }
}
