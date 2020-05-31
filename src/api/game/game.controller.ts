import { Body, Controller, Get, Logger, Param, Put, Post } from "@nestjs/common"

import { plainToClass } from "class-transformer"
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from "@nestjs/swagger"
import { TournamentService } from "../tournament/tournament.service"
import { GameService } from "./game.service"
import { Roles } from "../guard/roles.decorator"
import { GameDto } from "./dto/game.dto"
import { UpdateGameDto } from "./dto/update-game.dto"
import { CreateGameDto } from "./dto/create-game.dto"
import { adminIdParameter } from "../shared/swagger/parameters.swagger"

@Controller("tournament/:hash/game")
@ApiTags("Game")
export class GameController {
  private readonly logger = new Logger(GameController.name)

  constructor(
    private readonly tournamentService: TournamentService,
    private readonly gameService: GameService,
  ) {}

  @Post()
  @Roles("admin")
  @ApiOperation({ 
    summary: "Generates a new game plan",
    description: "To create games for your tournament use the admin hash id. It Returns the created games.",
    parameters: [adminIdParameter],
   })
  @ApiBody({ type: [CreateGameDto] })
  @ApiResponse({
    status: 201,
    description: "Successful operation",
    type: [GameDto],
  })
  @ApiResponse({ status: 400, description: "Invalid Games" })
  @ApiResponse({ status: 404, description: "Tournament Not Found" })
  async create(
    @Param("hash") hash: string,
    @Body() createGameDtos: CreateGameDto[],
  ): Promise<GameDto[]> {
    const tournament = await this.tournamentService.findOneByHashOrFail(hash)
    const games = await this.gameService.create(tournament, createGameDtos)
    return games.map((g) => plainToClass(GameDto, g))
  }

  @Get()
  @Roles("visitor")
  @ApiOperation({ summary: "Find all game of the given tournament" })
  async findAll(@Param("hash") hash: string): Promise<GameDto[]> {
    const tournament = await this.tournamentService.findOneByHashOrFail(hash)
    const games = await this.gameService.findAll(tournament)
    return games.map((g) => plainToClass(GameDto, g))
  }

  @Get(":id")
  @Roles("visitor")
  @ApiOperation({ summary: "Find a game" })
  async findOne(@Param("id") id: string): Promise<GameDto> {
    const game = await this.gameService.findOne(id)
    return plainToClass(GameDto, game)
  }

  @Put(":id")
  @Roles("admin")
  @ApiOperation({ summary: "Update the score of a game" })
  async update(
    @Param("hash") hash: string,
    @Param("id") id: string,
    @Body() updateGameDto: UpdateGameDto,
  ): Promise<GameDto> {
    const tournament = await this.tournamentService.findOneByHashOrFail(hash)
    const game = await this.gameService.update(tournament, id, updateGameDto)
    return plainToClass(GameDto, game)
  }
}
