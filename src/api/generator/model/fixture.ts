export class Fixture {
  host: number
  guest: number

  constructor(public fieldIndex: number) {}

  swapPairing(): Fixture {
    const tempHost = this.host
    this.host = this.guest
    this.guest = tempHost
    return this
  }
}
