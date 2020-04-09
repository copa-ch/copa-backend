import { Controller, Get } from "@nestjs/common"
import { ApiOperation, ApiTags } from "@nestjs/swagger"
import { ConfigService } from "@nestjs/config"

@Controller("")
@ApiTags("meta")
export class APIController {
  constructor(private config: ConfigService) {}

  @Get()
  @ApiOperation({
    summary: "API Meta data",
    description: "Returns the name, description and the version of the api.",
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
