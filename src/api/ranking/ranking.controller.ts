import { Controller, Get, Logger, Param } from "@nestjs/common"
import { plainToClass } from "class-transformer"
import { ApiTags, ApiOperation } from "@nestjs/swagger"
import { Roles } from "../guard/roles.decorator"
import { RankingDto } from "./ranking.dto"
import { RankingService } from "./ranking.service"

@Controller("tournament/:hash/ranking")
@ApiTags("ranking")
export class RankingController {
  private readonly logger = new Logger(RankingController.name)

  constructor(private readonly rankingService: RankingService) {}

  @Get()
  @Roles("visitor")
  @ApiOperation({ summary: "Get the ranking of the tournament" })
  async generate(@Param("hash") hash: string): Promise<RankingDto[]> {
    const rankings = await this.rankingService.build(hash)
    return rankings.map(g => plainToClass(RankingDto, g))
  }
}
