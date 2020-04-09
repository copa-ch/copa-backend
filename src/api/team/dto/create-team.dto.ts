import { IsNotEmpty } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class CreateTeamDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string
}
