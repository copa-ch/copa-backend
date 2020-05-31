import { IsNotEmpty } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class UpdateGameDto {
  @IsNotEmpty()
  @ApiProperty({ required: true, example: 1, minimum: 0 })
  hostScore: number

  @IsNotEmpty()
  @ApiProperty({ required: true, example: 1, minimum: 0 })
  guestScore: number
}
