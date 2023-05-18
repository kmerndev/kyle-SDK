import { ApiClient } from "./sdk/ApiClient";
import { Movies } from "./sdk/movies";
import { Quotes } from "./sdk/quotes";

export class LotrClient {
  apiClient : ApiClient;
  movies: Movies;
  quotes: Quotes

  constructor(config: { apiKey: string;}) {
    if(!config){
      throw new Error('Please provide Api Key')
    }
    this.apiClient = new ApiClient(config)
    this.movies = new Movies(this.apiClient);
    this.quotes = new Quotes(this.apiClient)
  }
}

export default { LotrClient }