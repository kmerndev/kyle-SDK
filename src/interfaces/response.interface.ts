import { IMovie } from "./movie.interface"
import { IQuote } from "./quote.interface"

export interface IResponse {
  total?: number
  limit?: number
  page?: number
  pages?: number
  docs: IMovie[] | IQuote[]
}
