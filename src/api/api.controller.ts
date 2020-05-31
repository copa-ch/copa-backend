import { Controller, Get } from "@nestjs/common"
import { ApiOperation, ApiTags, ApiResponse } from "@nestjs/swagger"
import { ConfigService } from "@nestjs/config"
import { APIInformationDto } from "./api-information.dto"

@Controller("")
@ApiTags("API Information")
export class APIController {
  constructor(private config: ConfigService) {}

  @Get()
  @ApiOperation({
    summary: "API Meta data",
    description: "Returns the name, description and the version of the api.",
  })
  @ApiResponse({
    status: 200,
    description: "Successful created new tournament",
    type: APIInformationDto,
  })
  main() {
    return {
      name: this.config.get("app.name"),
      title: this.config.get("app.title"),
      description: this.config.get("app.description"),
      version: this.config.get("app.version"),
    }
  }
}
