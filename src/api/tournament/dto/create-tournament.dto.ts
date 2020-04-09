import { IsEmail, IsNotEmpty } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class CreateTournamentDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string

  @ApiProperty()
  @IsNotEmpty()
  owner: string

  @ApiProperty()
  @IsEmail()
  email: string
}
