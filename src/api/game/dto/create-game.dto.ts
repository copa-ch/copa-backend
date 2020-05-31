import { Type } from "class-transformer"
import { ApiProperty } from "@nestjs/swagger"
import { TeamDto } from "../../team/dto/team.dto"
import { IsNotEmpty, Min } from "class-validator"

export class CreateGameDto {
  @IsNotEmpty()
  @Min(1)
  @ApiProperty({ required: true, example: 1, minimum: 1 })
  readonly round: number

  @IsNotEmpty()
  @ApiProperty({
    required: true,
    example: { id: "7265b844-c9dc-42e7-a52e-bc16ec0fae28", name: "X-Mens" },
  })
  @Type(() => TeamDto)
  readonly host: TeamDto

  @IsNotEmpty()
  @ApiProperty({
    required: true,
    example: { id: "817a3fd1-6913-44cf-b4da-eb42a69903a6", name: "Defenders" },
  })
  @Type(() => TeamDto)
  readonly guest: TeamDto
}
