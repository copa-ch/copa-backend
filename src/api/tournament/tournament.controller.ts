import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  Param,
  NotFoundException,
  Put,
  Delete,
} from "@nestjs/common"
import { plainToClass } from "class-transformer"
import { ApiTags, ApiOperation } from "@nestjs/swagger"
import { TournamentService } from "./tournament.service"
import { CreateTournamentDto } from "./dto/create-tournament.dto"
import { Tournament } from "./tournament.entity"
import { TournamentDto } from "./dto/tournament.dto"
import { Roles } from "../guard/roles.decorator"
import { UpdateTournamentDto } from "./dto/update-tournament.dto"

@Controller("tournament")
@ApiTags("tournament")
export class TournamentController {
  private readonly logger = new Logger(TournamentController.name)

  constructor(private readonly tournamentService: TournamentService) {}

  @Post()
  @ApiOperation({ summary: "Create a new tournament" })
  create(
    @Body() createTournamentDto: CreateTournamentDto,
  ): Promise<Tournament> {
    return this.tournamentService.create(createTournamentDto)
  }

  @Get(":hash")
  @ApiOperation({ summary: "Find a tournament with the visitor or admin hash" })
  async findOneByHash(@Param("hash") hash: string): Promise<TournamentDto> {
    const tournament = await this.tournamentService.findOneByHashOrFail(hash)
    return plainToClass(TournamentDto, tournament)
  }

  @Put(":hash")
  @Roles("admin")
  @ApiOperation({ summary: "Update a tournament" })
  async update(
    @Param("hash") hash: string,
    @Body() updateTournamentDto: UpdateTournamentDto,
  ): Promise<TournamentDto> {
    const tournament = await this.tournamentService.update(
      hash,
      updateTournamentDto,
    )
    return plainToClass(TournamentDto, tournament)
  }

  @Delete(":hash")
  @Roles("admin")
  @ApiOperation({ summary: "Delete a tournament" })
  delete(@Param("hash") hash: string): void {
    this.tournamentService.deleteByAdminHash(hash)
  }
}
