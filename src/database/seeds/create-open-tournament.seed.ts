import { Factory, Seeder } from "typeorm-seeding"
import { Tournament } from "../../api/tournament/tournament.entity"

export class CreateOpenTournament implements Seeder {
  public async run(factory: Factory): Promise<void> {
    await factory(Tournament)().create()
  }
}
