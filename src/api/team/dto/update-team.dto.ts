import { IsNotEmpty } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class UpdateTeamDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string
}
