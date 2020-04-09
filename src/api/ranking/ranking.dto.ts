import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { TeamDto } from "../team/dto/team.dto"

export class RankingDto {
  @ApiProperty()
  readonly position: number

  @ApiProperty()
  @Type(() => TeamDto)
  readonly team: TeamDto

  @ApiProperty()
  readonly played: number

  @ApiProperty()
  readonly won: number

  @ApiProperty()
  readonly drawn: number

  @ApiProperty()
  readonly lost: number

  @ApiProperty()
  readonly goals: number

  @ApiProperty()
  readonly goalsAgainst: number

  @ApiProperty()
  readonly points: number
}
