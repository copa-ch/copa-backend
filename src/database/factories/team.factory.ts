import * as Faker from "faker"
import { define } from "typeorm-seeding"
import { Team } from "../../api/team/team.entity"

define(Team, (faker: typeof Faker) => {
  const team = new Team()
  const name = `${faker.random.word()} Team`
  team.id = faker.random.uuid()
  team.name = `${name.charAt(0).toUpperCase()}${name.slice(1)}`
  return team
})
