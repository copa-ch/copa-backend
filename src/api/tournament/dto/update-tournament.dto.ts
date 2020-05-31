import { ApiProperty } from "@nestjs/swagger"
import { IsIn } from "class-validator"
import { TournamentState } from "../tournament-state"

export class UpdateTournamentDto {
  @ApiProperty({ example: "Avengers Cup" })
  name?: string

  @ApiProperty({ example: "Tony Stark" })
  owner?: string

  @IsIn(Object.values(TournamentState))
  @ApiProperty({ enum: Object.values(TournamentState) })
  state?: TournamentState
}
