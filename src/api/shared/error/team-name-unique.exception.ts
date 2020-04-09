import { HttpException, HttpStatus } from "@nestjs/common"

export class TeamNameUniqueException extends HttpException {
  constructor() {
    super("Team name must be unique", HttpStatus.BAD_REQUEST)
  }
}
