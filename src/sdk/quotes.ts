import { ApiClient } from "./ApiClient";
import { PATH, createPath } from "../utils/paths";
import { IError } from "../interfaces/error.interface";
import { IResponse } from "../interfaces/response.interface";
import { IParams } from "../interfaces/params.interface";

export class Quotes {
  private client: ApiClient

  constructor(client: ApiClient){
    this.client = client
  }

  /**
   * 
   * @param params Object that contains the params sent by client
   * @returns The list of quotes based on params given by lient
   */
  getQuotes(params?: IParams): Promise<IResponse | IError>{
    const path = createPath(PATH.QUOTE, params);
    return this.client.get(path)
  }

  /**
   * 
   * @param id This is the ID of target quote
   * @returns The target quote details
   */
  getQuoteById(id: string): Promise<IResponse | IError>{
    return this.client.get(PATH.QUOTE_BY_ID(id))
  }

}

export default { Quotes }