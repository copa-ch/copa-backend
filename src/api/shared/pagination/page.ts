import { Pageable } from "./pageable"

export class Page<T> {
  static create<T>(pageable: Pageable, total: number, items: T[]): Page<T> {
    return new Page(pageable.page, pageable.size, total, items)
  }

  constructor(
    public page: number,
    public size: number,
    public total: number,
    public items: T[],
  ) {}
}
