import { BASE_URL } from "../utils/paths";
import { IConfig } from "../interfaces/config.interface";

export class ApiClient {
  private apiKey: string;

  constructor(private config: IConfig) {
    this.apiKey = config.apiKey;
  }

  /**
   * 
   * @param url complete url for GET method API
   * @returns data based on the request
   */
  async get<T>(url: string): Promise<any> {
    try {
      const response = await fetch(`${BASE_URL}${url}`, {
        headers: {Authorization: `Bearer ${this.apiKey}`},
      });
    
      if (!response.ok) {
        throw new Error('Request failed');
      }
      return await response.json()
    } catch (error) {
      return {
          status: 500, 
          success: false,
          ...error
        }
    }
  }
}

export default { ApiClient };