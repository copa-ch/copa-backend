import * as Faker from "faker"
import { define } from "typeorm-seeding"
import { Game } from "../../api/game/game.entity"

define(Game, (faker: typeof Faker) => {
  const game = new Game()
  game.id = faker.random.uuid()
  return game
})
