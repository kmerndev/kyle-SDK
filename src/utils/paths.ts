import { IParams } from "../interfaces/params.interface"

export const BASE_URL = 'https://the-one-api.dev/v2'
export const PATH = {
  MOVIE: '/movie',
  QUOTE: '/quote',
  MOVIE_BY_ID: (id: string) => (`/movie/${id}`),
  QUOTE_BY_ID: (id: string) => (`/quote/${id}`),
  ALL_MOVIE_QUOTES: (id: string) => (`/movie/${id}/quote`),
}

export const createPath = (path: string, params: IParams) => {
  let paramString = '';
  if (params) {
    paramString += '?'
    params = { ...params, ...params.filter }
    for (let key in params) {
      switch(key) {
        case 'limit':
        case 'page':
          paramString += `${key}=${params[key]}&`
          break;
        case 'sort':
          paramString += `sort=${params[key].key}:${params[key].value}&`
          break;
        case 'eq':
          paramString += `${params[key].key}=${params[key].value}&`
          break;
        case 'ne':
          paramString += `${params[key].key}!=${params[key].value}&`
          break;
        case 'contains':
          paramString += `${params[key].key}=${params[key].value.join()}&`
          break;
        case 'notContains':
          paramString += `${params[key].key}!=${params[key].value.join()}&`
          break;
        case 'exists':
          paramString += `${params[key].value}&`
          break;
        case 'notExists':
          paramString += `!${params[key].value}&`
          break;
        case 'lt':
          paramString += `${params[key].key}<${params[key].value}&`
          break;
        case 'lte':
          paramString += `${params[key].key}<=${params[key].value}&`
          break;
        case 'gt':
          paramString += `${params[key].key}>${params[key].value}&`
          break;
        case 'gte':
          paramString += `${params[key].key}>=${params[key].value}&`
          break;
      }
    }
  }
  return `${path}${paramString}`
}