import { IsNotEmpty } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class UpdateGameDto {
  @IsNotEmpty()
  @ApiProperty()
  hostScore: number

  @IsNotEmpty()
  @ApiProperty()
  guestScore: number
}
