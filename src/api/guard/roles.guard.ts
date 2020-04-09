import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from "@nestjs/common"
import { Reflector } from "@nestjs/core"
import { TournamentService } from "../tournament/tournament.service"

@Injectable()
export class RolesGuard implements CanActivate {
  private readonly logger = new Logger(RolesGuard.name)

  constructor(
    private readonly reflector: Reflector,
    private readonly tournamentService: TournamentService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>("roles", context.getHandler())
    const request = context.switchToHttp().getRequest()
    const params = request.params

    if (roles && roles.includes("visitor")) {
      if (params && params.hash) {
        const tournament = await this.tournamentService.findOneByHash(
          params.hash,
        )
        if (tournament) {
          this.logger.log("Request is allowed")
          return true
        }
      }
      this.logger.log("Request is denied")
      return false
    }

    if (roles && roles.includes("admin")) {
      this.logger.log("Check admin permission for given tournament")
      if (params && params.hash) {
        const tournament = await this.tournamentService.findOneByAdminHash(
          params.hash,
        )
        if (tournament) {
          this.logger.log("Request is allowed")
          return true
        }
      }
      this.logger.log("Request is denied")
      return false
    }
    return true
  }
}
