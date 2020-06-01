import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  Param,
  Put,
  Delete,
  NotFoundException,
} from "@nestjs/common"
import { plainToClass } from "class-transformer"
import { ApiTags, ApiOperation } from "@nestjs/swagger"
import { TournamentService } from "../tournament/tournament.service"
import { TeamService } from "./team.service"
import { Roles } from "../guard/roles.decorator"
import { CreateTeamDto } from "./dto/create-team.dto"
import { TeamDto } from "./dto/team.dto"
import { UpdateTeamDto } from "./dto/update-team.dto"
import { GeneratorService } from "../generator/generator.service"
import { GameService } from "../game/game.service"
import { Tournament } from "../tournament/tournament.entity"

@Controller("tournament/:hash/team")
@ApiTags("team")
export class TeamController {
  private readonly logger = new Logger(TeamController.name)

  constructor(
    private readonly tournamentService: TournamentService,
    private readonly teamService: TeamService,
    private readonly generatorService: GeneratorService,
    private readonly gameService: GameService,
  ) {}

  @Post()
  @Roles("visitor")
  @ApiOperation({ summary: "Add new team to the tournament" })
  async create(
    @Param("hash") hash: string,
    @Body() createTeamDto: CreateTeamDto,
  ): Promise<TeamDto> {
    const tournament = await this.tournamentService.findOneByHashOrFail(hash)
    const team = await this.teamService.create(tournament, createTeamDto)
    await this.regenerateGames(tournament)
    return plainToClass(TeamDto, team)
  }

  @Get()
  @Roles("visitor")
  @ApiOperation({ summary: "Find all team of the given tournament" })
  async findAll(@Param("hash") hash: string): Promise<TeamDto[]> {
    const tournament = await this.tournamentService.findOneByHashOrFail(hash)
    const teams = await this.teamService.findAll(tournament)
    return teams.map((t) => plainToClass(TeamDto, t))
  }

  @Get(":id")
  @Roles("visitor")
  @ApiOperation({ summary: "Find a team" })
  async findOne(@Param("id") id: string): Promise<TeamDto> {
    const team = await this.teamService.findOne(id)
    return plainToClass(TeamDto, team)
  }

  @Put(":id")
  @Roles("visitor")
  @ApiOperation({ summary: "Update a team" })
  async update(
    @Param("hash") hash: string,
    @Param("id") id: string,
    @Body() updateTeamDto: UpdateTeamDto,
  ): Promise<TeamDto> {
    const tournament = await this.tournamentService.findOneByHashOrFail(hash)
    const team = await this.teamService.update(tournament, id, updateTeamDto)
    if (!team) {
      throw new NotFoundException()
    }
    await this.regenerateGames(tournament)
    return plainToClass(TeamDto, team)
  }

  @Delete(":id")
  @Roles("visitor")
  @ApiOperation({ summary: "Delete a team" })
  async delete(
    @Param("hash") hash: string,
    @Param("id") id: string,
  ): Promise<void> {
    const tournament = await this.tournamentService.findOneByHashOrFail(hash)
    await this.teamService.delete(tournament, id)
    await this.regenerateGames(tournament)
  }

  async regenerateGames(tournament: Tournament) {
    await this.gameService.removeAll(tournament)
    const games = await this.generatorService.generateGames(tournament)
    await this.gameService.create(tournament, games)
  }
}
