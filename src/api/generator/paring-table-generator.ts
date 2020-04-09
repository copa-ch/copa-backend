import { ParingTable } from "./model/paring-table"
import { Logger } from "@nestjs/common"

export class ParingTableGenerator {
  private readonly logger = new Logger(ParingTableGenerator.name)

  counterHostSide: number
  counterGuestSide: number
  numberOfTeams: number
  hasLuckyOne = false

  public withNumberOfTeams(numberOfTeams: number): ParingTableGenerator {
    this.numberOfTeams = numberOfTeams
    if (this.numberOfTeams % 2 !== 0) {
      this.hasLuckyOne = true
      this.numberOfTeams++
    }
    return this
  }

  public generate() {
    this.counterHostSide = 0
    this.counterGuestSide = this.numberOfTeams - 2

    let paringTable: ParingTable = new ParingTable(this.numberOfTeams)
    paringTable = this.fillOutLastTeam(paringTable)
    paringTable = this.fillOutHostSide(paringTable)
    paringTable = this.fillOutGuestSide(paringTable)
    paringTable = this.swapSideForFirstColumn(paringTable)

    if (this.hasLuckyOne) {
      this.removeLuckyOne(paringTable)
      this.numberOfTeams--
      paringTable.numberOfTeams = this.numberOfTeams
    }

    return paringTable
  }

  private fillOutLastTeam(paringTable: ParingTable): ParingTable {
    paringTable.rounds = paringTable.rounds.map(round => {
      round.fixtures[0].guest = this.numberOfTeams - 1
      return round
    })
    return paringTable
  }

  private fillOutHostSide(paringTable: ParingTable): ParingTable {
    paringTable.rounds = paringTable.rounds.map(round => {
      round.fixtures = round.fixtures.map(fixture => {
        fixture.host = this.nextHostSideCounter()
        return fixture
      })
      return round
    })
    return paringTable
  }

  private fillOutGuestSide(paringTable: ParingTable): ParingTable {
    paringTable.rounds = paringTable.rounds.map(round => {
      round.fixtures = round.fixtures.map(fixture => {
        if (fixture.fieldIndex > 0) {
          fixture.guest = this.nextGuestSideCounter()
        }
        return fixture
      })
      return round
    })
    return paringTable
  }

  private swapSideForFirstColumn(paringTable: ParingTable): ParingTable {
    paringTable.rounds = paringTable.rounds.map(round => {
      round.fixtures = round.fixtures.map(fixture => {
        if (fixture.fieldIndex === 0 && round.index % 2 === 0) {
          return fixture.swapPairing()
        }
        return fixture
      })
      return round
    })
    return paringTable
  }

  private removeLuckyOne(paringTable: ParingTable): ParingTable {
    paringTable.rounds = paringTable.rounds.map(round => {
      round.fixtures.shift()
      return round
    })
    return paringTable
  }

  private nextHostSideCounter(): number {
    if (this.counterHostSide === this.numberOfTeams - 1) {
      this.counterHostSide = 0
    }
    return this.counterHostSide++
  }

  private nextGuestSideCounter(): number {
    if (this.counterGuestSide < 0) {
      this.counterGuestSide = this.numberOfTeams - 2
    }
    return this.counterGuestSide--
  }
}
