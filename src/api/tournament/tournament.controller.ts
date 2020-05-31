import { Body, Controller, Get, Post, Param, Put, Delete } from "@nestjs/common"
import { plainToClass } from "class-transformer"
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from "@nestjs/swagger"
import { TournamentService } from "./tournament.service"
import { CreateTournamentDto } from "./dto/create-tournament.dto"
import { TournamentDto } from "./dto/tournament.dto"
import { Roles } from "../guard/roles.decorator"
import { UpdateTournamentDto } from "./dto/update-tournament.dto"
import { CreatedTournamentDto } from "./dto/created-tournament.dto"
import { visitorIdParameter, adminIdParameter } from "../shared/swagger/parameters.swagger"

@Controller("tournament")
@ApiTags("Tournament")
export class TournamentController {
  constructor(private readonly tournamentService: TournamentService) {}

  @Post()
  @ApiOperation({
    summary: "Create a new tournament",
    description:
      "Returns a new tournament with an admin hash id to manage your tournament.",
  })
  @ApiBody({ type: CreateTournamentDto })
  @ApiResponse({
    status: 201,
    description: "Successful created new tournament",
    type: CreatedTournamentDto,
  })
  @ApiResponse({ status: 400, description: "Bad Request" })
  async create(
    @Body() createTournamentDto: CreateTournamentDto,
  ): Promise<CreatedTournamentDto> {
    const tournament = await this.tournamentService.create(createTournamentDto)
    return plainToClass(CreatedTournamentDto, tournament)
  }

  @Get(":hash")
  @ApiOperation({
    summary: "Find a tournament with the visitor or admin hash",
    description:
      "To find your tournament use the visitor or the admin hash id. It returns a tournament.",
    parameters: [visitorIdParameter],
  })
  @ApiResponse({
    status: 200,
    description: "Successful operation",
    type: TournamentDto,
  })
  @ApiResponse({ status: 404, description: "Not Found" })
  async findOneByHash(@Param("hash") hash: string): Promise<TournamentDto> {
    const tournament = await this.tournamentService.findOneByHashOrFail(hash)
    return plainToClass(TournamentDto, tournament)
  }

  @Put(":hash")
  @Roles("admin")
  @ApiOperation({
    summary: "Update a tournament",
    description:
      "To update your tournament use the admin hash id. It Returns the updated tournamnet.",
    parameters: [adminIdParameter],
  })
  @ApiBody({ type: UpdateTournamentDto })
  @ApiResponse({
    status: 200,
    description: "Successful operation",
    type: TournamentDto,
  })
  @ApiResponse({ status: 400, description: "Bad Request" })
  @ApiResponse({ status: 404, description: "Not Found" })
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
  @ApiOperation({
    summary: "Delete a tournament",
    description:
      "To delete your tournament use the admin hash id. It Returns the updated tournamnet.",
    parameters: [adminIdParameter],
  })
  @ApiResponse({ status: 204, description: "Successful operation" })
  @ApiResponse({ status: 404, description: "Not Found" })
  delete(@Param("hash") hash: string): void {
    this.tournamentService.deleteByAdminHash(hash)
  }
}
