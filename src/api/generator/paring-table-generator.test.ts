import { ParingTableGenerator } from "./paring-table-generator"
import { ParingTable } from "./model/paring-table"

describe("GameService", () => {
  let generator: ParingTableGenerator

  beforeEach(async () => {
    generator = new ParingTableGenerator()
  })

  test("Should return a empty paringTable", () => {
    const paringTable: ParingTable = generator.withNumberOfTeams(0).generate()

    expect(paringTable.rounds.length).toBe(0)
  })

  test("Should return a paringTable for 2 teams", () => {
    const paringTable: ParingTable = generator.withNumberOfTeams(2).generate()

    expectRound(paringTable, 0, [1, 0])
  })

  test("Should return a paringTable for 3 teams", () => {
    const paringTable: ParingTable = generator.withNumberOfTeams(3).generate()

    expectRound(paringTable, 0, [1, 2])
    expectRound(paringTable, 1, [0, 1])
    expectRound(paringTable, 2, [2, 0])
  })

  test("Should return a paringTable for 4 teams", () => {
    const paringTable: ParingTable = generator.withNumberOfTeams(4).generate()

    expectRound(paringTable, 0, [3, 0, 1, 2])
    expectRound(paringTable, 1, [2, 3, 0, 1])
    expectRound(paringTable, 2, [3, 1, 2, 0])
  })

  test("Should return a paringTable for 5 teams", () => {
    const paringTable: ParingTable = generator.withNumberOfTeams(5).generate()

    expectRound(paringTable, 0, [1, 4, 2, 3])
    expectRound(paringTable, 1, [4, 2, 0, 1])
    expectRound(paringTable, 2, [2, 0, 3, 4])
    expectRound(paringTable, 3, [0, 3, 1, 2])
    expectRound(paringTable, 4, [3, 1, 4, 0])
  })

  test("Should return a paringTable for 6 teams", () => {
    const paringTable: ParingTable = generator.withNumberOfTeams(6).generate()

    expectRound(paringTable, 0, [5, 0, 1, 4, 2, 3])
    expectRound(paringTable, 1, [3, 5, 4, 2, 0, 1])
    expectRound(paringTable, 2, [5, 1, 2, 0, 3, 4])
    expectRound(paringTable, 3, [4, 5, 0, 3, 1, 2])
    expectRound(paringTable, 4, [5, 2, 3, 1, 4, 0])
  })

  function expectRound(
    paringTable: ParingTable,
    roundIndex: number,
    pairs: number[],
  ): void {
    const round = paringTable.rounds[roundIndex]
    let pairIndex = 0
    round.fixtures.forEach(fixture => {
      expect(fixture.host).toBe(pairs[pairIndex++])
      expect(fixture.guest).toBe(pairs[pairIndex++])
    })
  }
})
