import { GameService } from "./game.service"
import { GameRepository } from "./game.repository"
import { Game } from "./game.entity"
import { TournamentState } from "../tournament/tournament-state"
import { Tournament } from "../tournament/tournament.entity"
import { UpdateGameDto } from "./dto/update-game.dto"

describe("GameService", () => {
  let service: GameService
  let repository: GameRepository

  beforeEach(async () => {
    repository = new GameRepository()
    jest.spyOn(repository, "save").mockImplementation(game => game as any)
    jest
      .spyOn(repository, "findOneOrFail")
      .mockImplementation(_ => Promise.resolve({} as Game))

    service = new GameService(repository, undefined)
  })

  describe("update", () => {
    test("should update the game scoring ", async () => {
      const tournament = { state: TournamentState.Playable } as Tournament
      const dto = {
        hostScore: 1,
        guestScore: 2,
      } as UpdateGameDto

      const game = await service.update(tournament, "any", dto)

      expect(game.hostScore).toBe(dto.hostScore)
      expect(game.guestScore).toBe(dto.guestScore)
    })

    test("should update the game scoring ", async () => {
      await testUpdateGameError(TournamentState.Open)
      await testUpdateGameError(TournamentState.Closed)
    })
  })

  /*
  |--------------------------------------------------------------------------
  | Utilities
  |--------------------------------------------------------------------------
  */

  async function testUpdateGameError(state: TournamentState) {
    const tournament = { state } as Tournament
    const dto = {} as UpdateGameDto

    try {
      await service.update(tournament, "any", dto)
      fail("Should throw error")
    } catch (error) {
      expect(error.status).toBe(400)
      expect(error.message).toBe(
        "Games can only be update during the Playable state",
      )
    }
  }
})
