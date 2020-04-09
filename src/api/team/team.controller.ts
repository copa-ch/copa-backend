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

@Controller("tournament/:hash/team")
@ApiTags("team")
export class TeamController {
  private readonly logger = new Logger(TeamController.name)

  constructor(
    private readonly tournamentService: TournamentService,
    private readonly teamService: TeamService,
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
    return plainToClass(TeamDto, team)
  }

  @Get()
  @Roles("visitor")
  @ApiOperation({ summary: "Find all team of the given tournament" })
  async findAll(@Param("hash") hash: string): Promise<TeamDto[]> {
    const tournament = await this.tournamentService.findOneByHashOrFail(hash)
    const teams = await this.teamService.findAll(tournament)
    return teams.map(t => plainToClass(TeamDto, t))
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
    this.teamService.delete(tournament, id)
  }
}
