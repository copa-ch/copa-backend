import { Exclude, Expose, Type } from "class-transformer"
import { ApiProperty } from "@nestjs/swagger"

@Exclude()
export class APIInformationDto {
  @Expose()
  @ApiProperty({ example: "copa-backend" })
  readonly name: string

  @Expose()
  @ApiProperty({ example: "COPA API" })
  readonly title: string

  @Expose()
  @ApiProperty({ example: "COPA is tournament managment tool" })
  readonly description: string

  @Expose()
  @ApiProperty({ example: "0.0.0" })
  readonly version: string
}
