import { Exclude, Expose } from "class-transformer"
import { ApiProperty } from "@nestjs/swagger"
import { TournamentState } from "../tournament-state"

@Exclude()
export class TournamentDto {
  readonly id: string

  @Expose()
  @ApiProperty({ example: "Avengers Cup" })
  readonly name: string

  @Expose()
  @ApiProperty({ example: "Tony Stark" })
  readonly owner: string

  @Expose()
  @ApiProperty({ enum: Object.values(TournamentState) })
  readonly state: TournamentState

  @Expose()
  @ApiProperty({ example: "hash" })
  readonly visitorId: string
}
