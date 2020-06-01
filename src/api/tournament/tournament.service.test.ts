import { TournamentService } from "./tournament.service"
import { TournamentRepository } from "./tournament.repository"
import { MailService } from "../../mail/mail.service"
import { ConfigService } from "@nestjs/config"
import { Tournament } from "./tournament.entity"
import { TournamentState } from "./tournament-state"
import { CreateTournamentDto } from "./dto/create-tournament.dto"
import { TournamentCreatedMail } from "./tournament-created.mail"
import { UpdateTournamentDto } from "./dto/update-tournament.dto"
import { getConnectionOptions, createConnection } from "typeorm"
import { CreateOpenTournament } from "../../database/seeds/create-open-tournament.seed"
import { useSeeding, runSeeder, factory, useRefreshDatabase, tearDownDatabase } from "typeorm-seeding"

describe.only("TournamentService", () => {
  beforeAll(async (done) => {
    // await useRefreshDatabase()
    await useSeeding()
    // await createTestingConnection()
    // await synchronizeTestingDatabase()
    // await setupFactories()
    const tournament = await factory(Tournament)().make()
    await runSeeder(CreateOpenTournament)
    done()
  })

  // afterAll(async (done) => {
  //   // await dropTestingDatabase()
  //   // await closeTestingConnection()
  //   await tearDownDatabase()
  //   done()
  // })

  // useSeeding()

  // console.log(factory)
  // const t = factory(Tournament)().make()
  // console.log(t)
  test.only("should", async (done) => {
    expect(true)
    done()
  })

  // let service: TournamentService
  // let repository: TournamentRepository
  // let mailService: MailService
  // let configService: ConfigService
  // let mockMailSend: jest.Mock

  // const tournamentDummy = new Tournament()
  // tournamentDummy.id = "any"
  // tournamentDummy.name = "any"
  // tournamentDummy.owner = "any"
  // tournamentDummy.visitorId = "any"
  // tournamentDummy.adminId = "any"
  // tournamentDummy.createdAt = "any"
  // tournamentDummy.updatedAt = "any"
  // tournamentDummy.state = TournamentState.Open
  // tournamentDummy.games = undefined
  // tournamentDummy.teams = undefined

  // beforeEach(async () => {
  //   configService = new ConfigService()
  //   jest.spyOn(configService, "get").mockImplementation(() => "any")

  //   mailService = new MailService(configService, undefined)
  //   mockMailSend = jest
  //     .spyOn(mailService, "send")
  //     .mockImplementation(() => void 0) as jest.Mock

  //   repository = new TournamentRepository()
  //   jest
  //     .spyOn(repository, "save")
  //     .mockImplementation((tournament) => tournament as any)

  //   service = new TournamentService(repository, mailService, configService)
  // })

  // describe("create", () => {
  //   test("should create a tournament with the given params and send a mail", async () => {
  //     const dto = {
  //       name: "Name",
  //       owner: "Owner",
  //       email: "mail@example.com",
  //     } as CreateTournamentDto

  //     const tournament = await service.create(dto)

  //     expect(tournament.name).toEqual(dto.name)
  //     expect(tournament.owner).toEqual(dto.owner)
  //     expect(tournament.state).toEqual(TournamentState.Open)
  //     expect(mockMailSend).toBeCalledWith(
  //       new TournamentCreatedMail(tournament, "any"),
  //       dto.email,
  //     )
  //   })
  // })

  // describe("update", () => {
  //   describe("from state Open", () => {
  //     test("should change the state to Open", async () => {
  //       await testUpdate(TournamentState.Open, TournamentState.Open)
  //     })

  //     test("should change the state to Playable", async () => {
  //       await testUpdate(TournamentState.Open, TournamentState.Playable)
  //     })

  //     test("should fail to change state to Closed", async () => {
  //       await testUpdateException(TournamentState.Open, TournamentState.Closed)
  //     })
  //   })

  //   describe("from state Playable", () => {
  //     test("should fail to change state to Open", async () => {
  //       await testUpdateException(
  //         TournamentState.Playable,
  //         TournamentState.Open,
  //       )
  //     })

  //     test("should change state to Playable", async () => {
  //       await testUpdate(TournamentState.Playable, TournamentState.Playable)
  //     })

  //     test("should change state to Closed", async () => {
  //       await testUpdate(TournamentState.Playable, TournamentState.Closed)
  //     })
  //   })

  //   describe("from state Closed", () => {
  //     test("should fail to change state to Open", async () => {
  //       await testUpdateException(TournamentState.Closed, TournamentState.Open)
  //     })

  //     test("should fail to change state to Playable", async () => {
  //       await testUpdateException(
  //         TournamentState.Closed,
  //         TournamentState.Playable,
  //       )
  //     })

  //     test("should update the entity with state Closed to Closed", async () => {
  //       await testUpdate(TournamentState.Closed, TournamentState.Closed)
  //     })
  //   })
  // })

  // /*
  // |--------------------------------------------------------------------------
  // | Utilities
  // |--------------------------------------------------------------------------
  // */

  // async function testUpdate(
  //   fromState: TournamentState,
  //   toState: TournamentState,
  // ) {
  //   const dto = createUpdatedDto(toState)
  //   jest.spyOn(repository, "find").mockImplementation(() =>
  //     resolveUpdatedDtoWithDummy({
  //       state: toState,
  //     }),
  //   )
  //   const tournament = await service.update("any", dto)
  //   expectUpdatedDto(dto, tournament)
  // }

  // async function testUpdateException(
  //   fromState: TournamentState,
  //   toState: TournamentState,
  // ) {
  //   const dto = createUpdatedDto(toState)
  //   jest.spyOn(repository, "find").mockImplementation(() =>
  //     resolveUpdatedDtoWithDummy({
  //       state: fromState,
  //     }),
  //   )

  //   try {
  //     await service.update("any", dto)
  //     fail("Expect error")
  //   } catch (error) {
  //     expect(error.status).toBe(400)
  //     expect(error.message).toBe("Illegal state change")
  //   }
  // }

  // function createUpdatedDto(state: TournamentState) {
  //   return {
  //     name: "Name",
  //     owner: "Owner",
  //     state,
  //   } as UpdateTournamentDto
  // }

  // function resolveUpdatedDtoWithDummy(dto?: any) {
  //   return Promise.resolve([
  //     {
  //       ...tournamentDummy,
  //       ...dto,
  //     },
  //   ])
  // }

  // function expectUpdatedDto(dto: UpdateTournamentDto, tournament: Tournament) {
  //   expect(tournament.name).toEqual(dto.name)
  //   expect(tournament.owner).toEqual(dto.owner)
  //   expect(tournament.state).toEqual(dto.state)
  // }
})
