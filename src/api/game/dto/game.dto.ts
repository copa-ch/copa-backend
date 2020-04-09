import { Exclude, Expose, Type } from "class-transformer"
import { ApiProperty } from "@nestjs/swagger"
import { TeamDto } from "../../team/dto/team.dto"

@Exclude()
export class GameDto {
  @Expose()
  @ApiProperty()
  readonly id: string

  @Expose()
  @ApiProperty()
  readonly round: number

  @Expose()
  @ApiProperty()
  @Type(() => TeamDto)
  readonly host: TeamDto

  @Expose()
  @ApiProperty()
  @Type(() => TeamDto)
  readonly guest: TeamDto

  @Expose()
  @ApiProperty()
  readonly hostScore: number

  @Expose()
  @ApiProperty()
  readonly guestScore: number
}
