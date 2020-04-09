import * as Faker from "faker"
import * as shortid from "shortid"
import { define } from "typeorm-seeding"
import { Tournament } from "../../api/tournament/tournament.entity"
import { TournamentState } from "../../api/tournament/tournament-state"

define(Tournament, (faker: typeof Faker) => {
  const firstName = faker.name.firstName()
  const lastName = faker.name.lastName()
  const name = `${faker.random.word()} Tournament`

  const tournament = new Tournament()
  tournament.id = faker.random.uuid()
  tournament.name = `${name.charAt(0).toUpperCase()}${name.slice(1)}`
  tournament.owner = `${firstName} ${lastName}`
  tournament.state = TournamentState.Open
  tournament.adminId = shortid.generate()
  tournament.visitorId = shortid.generate()
  return tournament
})
