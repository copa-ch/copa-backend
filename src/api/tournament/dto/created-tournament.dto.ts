import { Exclude, Expose } from "class-transformer"
import { ApiProperty } from "@nestjs/swagger"
import { TournamentDto } from "./tournament.dto"

@Exclude()
export class CreatedTournamentDto extends TournamentDto {
  @Expose()
  @ApiProperty({ example: "hash" })
  readonly adminId: string
}
