import { FindManyOptions } from "typeorm"

export class Pageable {
  readonly page: number
  readonly size: number

  buildFindManyOptions(): any {
    return {
      take: this.size,
      skip: this.size * this.page,
    } as FindManyOptions<any>
  }
}
