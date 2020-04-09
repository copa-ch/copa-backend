import { ApiProperty } from "@nestjs/swagger"
import { IsIn } from "class-validator"
import { TournamentState } from "../tournament-state"

export class UpdateTournamentDto {
  @ApiProperty()
  name?: string

  @ApiProperty()
  owner?: string

  @IsIn(Object.values(TournamentState))
  @ApiProperty({ enum: Object.values(TournamentState) })
  state?: TournamentState
}
