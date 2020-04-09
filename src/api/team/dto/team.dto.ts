import { Exclude, Expose } from "class-transformer"
import { ApiProperty } from "@nestjs/swagger"

@Exclude()
export class TeamDto {
  @Expose()
  @ApiProperty()
  readonly id: string

  @Expose()
  @ApiProperty()
  readonly name: string
}
