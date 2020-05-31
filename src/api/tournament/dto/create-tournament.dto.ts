import { IsEmail, IsNotEmpty } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class CreateTournamentDto {
  @ApiProperty({ required: true, example: "Avengers Cup" })
  @IsNotEmpty()
  name: string

  @ApiProperty({ required: true, example: "Tony Stark" })
  @IsNotEmpty()
  owner: string

  @ApiProperty({ example: "tony.stark@stark-industries.com" })
  @IsEmail()
  email: string
}
