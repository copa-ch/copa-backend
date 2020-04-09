import { Type } from "class-transformer"
import { ApiProperty } from "@nestjs/swagger"
import { TeamDto } from "../../team/dto/team.dto"
import { IsNotEmpty, Min } from "class-validator"

export class CreateGameDto {
  @IsNotEmpty()
  @Min(1)
  @ApiProperty()
  readonly round: number

  @IsNotEmpty()
  @ApiProperty()
  @Type(() => TeamDto)
  readonly host: TeamDto

  @IsNotEmpty()
  @ApiProperty()
  @Type(() => TeamDto)
  readonly guest: TeamDto
}
