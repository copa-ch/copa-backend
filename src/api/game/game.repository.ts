import { EntityRepository, Repository } from "typeorm"

import { Game } from "./game.entity"
import { Tournament } from "../tournament/tournament.entity"

@EntityRepository(Game)
export class GameRepository extends Repository<Game> {
  findAll(tournament: Tournament): Game[] | PromiseLike<Game[]> {
    return this.find({
      relations: ["host", "guest"],
      where: { tournament },
      order: {
        round: "ASC",
      },
    })
  }
}
