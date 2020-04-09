import { TeamService } from "./team.service"
import { TeamRepository } from "./team.repository"
import { Team } from "./team.entity"
import { TournamentState } from "../tournament/tournament-state"
import { Tournament } from "../tournament/tournament.entity"
import { CreateTeamDto } from "./dto/create-team.dto"
import { UpdateTeamDto } from "./dto/update-team.dto"

describe("TeamService", () => {
  let service: TeamService
  let repository: TeamRepository

  beforeEach(async () => {
    repository = new TeamRepository()
    jest.spyOn(repository, "save").mockImplementation(team => team as any)
    jest.spyOn(repository, "count").mockImplementation(_ => Promise.resolve(0))
    jest.spyOn(repository, "findOneOrFail").mockImplementation(_ =>
      Promise.resolve({
        name: "current team name",
      } as Team),
    )

    service = new TeamService(repository)
  })

  describe("create", () => {
    test("should create team and add it to the tournament", async () => {
      const tournament = {
        id: "1",
        state: TournamentState.Open,
      } as Tournament
      const dto = { name: "team name" } as CreateTeamDto

      const team = await service.create(tournament, dto)

      expect(team.name).toBe(dto.name)
      expect(team.tournament.id).toBe(tournament.id)
    })

    test("should fail to create team due to incorrect tournament state", async () => {
      await testCreateTeamException(TournamentState.Playable)
      await testCreateTeamException(TournamentState.Closed)
    })
  })

  describe("update", () => {
    test("should update the team", async () => {
      const tournament = { state: TournamentState.Open } as Tournament
      const dto = { name: "team name" } as UpdateTeamDto

      const team = await service.update(tournament, "any", dto)

      expect(team.name).toBe(dto.name)
    })

    test("should fail to update team due to incorrect tournament state", async () => {
      await testUpdateTeamException(TournamentState.Playable)
      await testUpdateTeamException(TournamentState.Closed)
    })
  })

  describe("delete", () => {
    test("should delete the team", async () => {
      const tournament = { state: TournamentState.Open } as Tournament

      jest.spyOn(repository, "delete").mockImplementation(_ => void 0)

      await service.delete(tournament, "any")
    })

    test("should fail to update team due to incorrect tournament state", async () => {
      await testDeleteTeamException(TournamentState.Playable)
      await testDeleteTeamException(TournamentState.Closed)
    })
  })

  /*
  |--------------------------------------------------------------------------
  | Utilities
  |--------------------------------------------------------------------------
  */

  async function testCreateTeamException(state: TournamentState) {
    const tournament = {
      state,
    } as Tournament
    const dto = {} as CreateTeamDto

    try {
      await service.create(tournament, dto)
      fail("Should have thrown an error")
    } catch (error) {
      expect(error.status).toBe(400)
      expect(error.message).toBe(
        "Teams can only be changed during the Open state",
      )
    }
  }

  async function testUpdateTeamException(state: TournamentState) {
    const tournament = { state } as Tournament
    const dto = { name: "team name" } as UpdateTeamDto

    try {
      await service.update(tournament, "any", dto)
      fail("Should have thrown an error")
    } catch (error) {
      expect(error.status).toBe(400)
      expect(error.message).toBe(
        "Teams can only be changed during the Open state",
      )
    }
  }

  async function testDeleteTeamException(state: TournamentState) {
    const tournament = { state } as Tournament

    try {
      await service.delete(tournament, "any")
      fail("Should have thrown an error")
    } catch (error) {
      expect(error.status).toBe(400)
      expect(error.message).toBe(
        "Teams can only be changed during the Open state",
      )
    }
  }
})
