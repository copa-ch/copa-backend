import { Fixture } from "./fixture"

export class Round {
  fixtures: Fixture[] = []

  constructor(public index: number, numberOfFields: number) {
    for (let i = 0; i < numberOfFields; i++) {
      this.fixtures.push(new Fixture(i))
    }
  }
}
