import { Exclude, Expose, Type } from "class-transformer"
import { ApiProperty } from "@nestjs/swagger"
import { TeamDto } from "../../team/dto/team.dto"

@Exclude()
export class GameDto {
  @Expose()
  @ApiProperty({ example: "3dade3f4-ae9e-447d-8b5c-16fbc21ca670" })
  readonly id: string

  @Expose()
  @ApiProperty({ example: 1, minimum: 1 })
  readonly round: number

  @Expose()
  @ApiProperty({
    example: { id: "7265b844-c9dc-42e7-a52e-bc16ec0fae28", name: "X-Mens" },
  })
  @Type(() => TeamDto)
  readonly host: TeamDto

  @Expose()
  @ApiProperty({
    example: { id: "817a3fd1-6913-44cf-b4da-eb42a69903a6", name: "Defenders" },
  })
  @Type(() => TeamDto)
  readonly guest: TeamDto

  @Expose()
  @ApiProperty()
  @ApiProperty({ example: 1, minimum: 0 })
  readonly hostScore: number

  @Expose()
  @ApiProperty()
  @ApiProperty({ example: 1, minimum: 0 })
  readonly guestScore: number
}
