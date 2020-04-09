export class PageableResponse<DTO> {
  totalOfPages: number
  page: number
  size: number
  items: DTO[]
}
