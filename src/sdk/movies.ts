import { ApiClient } from "./ApiClient";
import { PATH, createPath } from "../utils/paths";
import { IError } from "../interfaces/error.interface";
import { IResponse } from "../interfaces/response.interface";
import { IParams } from "../interfaces/params.interface";

export class Movies {
  private client: ApiClient

  constructor(client: ApiClient){
    this.client = client
  }

  /**
   * 
   * @param params Object that contains the params sent by client
   * @returns List of movies based on params given by client
   */
  async getMovies(params?: IParams): Promise<IResponse | IError>{
    const path = createPath(PATH.MOVIE, params);
    return await this.client.get(path)
  }
  
  /**
   * 
   * @param id This is the ID of target movie
   * @returns The target movie details
   */
  async getMovieById(id: string): Promise<IResponse | IError>{
    return await this.client.get(PATH.MOVIE_BY_ID(id))
  }
  
  /**
   * 
   * @param id This is the ID of target movie
   * @param params Object that contains the params sent by client
   * @returns The target movie quotes
   */
  async getAllMovieQuotes(id: string, params?: IParams): Promise<IResponse | IError>{
    const path = createPath(PATH.ALL_MOVIE_QUOTES(id), params);
    return await this.client.get(path)
  }

}

export default { Movies }