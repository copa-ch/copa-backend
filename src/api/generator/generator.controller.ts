import { Controller, Logger, Param, Post } from "@nestjs/common"
import { plainToClass } from "class-transformer"
import { ApiTags, ApiOperation } from "@nestjs/swagger"
import { Roles } from "../guard/roles.decorator"
import { GeneratorService } from "./generator.service"
import { GameDto } from "../game/dto/game.dto"
import { TournamentService } from "../tournament/tournament.service"

@Controller("tournament/:hash/generator")
@ApiTags("generator")
export class GeneratorController {
  private readonly logger = new Logger(GeneratorController.name)

  constructor(
    private readonly generatorService: GeneratorService,
    private readonly tournamentService: TournamentService,
  ) {}

  @Post()
  @Roles("admin")
  @ApiOperation({ summary: "Generate a schedule for the given tournament" })
  async generate(@Param("hash") hash: string): Promise<GameDto[]> {
    const tournament = await this.tournamentService.findOneByHashOrFail(hash)
    const games = await this.generatorService.generateGames(tournament)
    return games.map(g => plainToClass(GameDto, g))
  }
}
