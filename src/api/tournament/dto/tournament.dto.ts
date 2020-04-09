import { Exclude, Expose } from "class-transformer"
import { ApiProperty } from "@nestjs/swagger"
import { TournamentState } from "../tournament-state"

@Exclude()
export class TournamentDto {
  @Expose()
  @ApiProperty()
  readonly id: string

  @Expose()
  @ApiProperty()
  readonly name: string

  @Expose()
  @ApiProperty()
  readonly owner: string

  @Expose()
  @ApiProperty({ enum: Object.values(TournamentState) })
  readonly state: TournamentState

  @Expose()
  @ApiProperty()
  readonly visitorId: string
}
