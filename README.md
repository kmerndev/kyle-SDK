# Your SDK Name

A comprehensive SDK for interacting with the [The One API](https://the-one-api.dev/sign-up).

## Features

Main goal is to make this API accessible to other developers. The SDK only needs to cover the movie and quote endpoints. This SDK also supports pagination, sorting and filtering.

- Get movies list
- Get movie by ID
- Get all quotes inside a movie
- Get quotes list
- Get quote by ID

## Dependencies

* `Node v18.15.0`
* `Axios v1.4.0`
* `axios-mock-adapter v1.21.4`,
* `jest v29.5.0`,
* `ts-node v10.9.1`

## Installation

Install the SDK using your package manager of choice:

```shell
npm install lotr-sdk-one-api
```

## How to use it?

### Signup on The One API and get API Key

First of all explore [The API](https://the-one-api.dev/sign-up) and signup for it. After signup take the api key and save it.
API complete documentation is available [here](https://the-one-api.dev/documentation)

### Initialize SDK

After getting api key, now initialize SDK inside your project.
```
import { LotrClient } from 'lotr-sdk-one-api'

const config = {
  apiKey: 'your api key here'
}

const lotrSdk = new LotrClient(config)
```

## Test

To test this package simply run.

```
npm test
```

## Methods

| Method | Argument | Explanation
| --------------- | --------------- | --------------- |
| getMovies | params (optional) | Fetch all movies by default, if params are passed then movies will be fetched based on params.
| getMovieById | id (required) | Fetch movie by id
| getAllMovieQuotes | id (required), params (optional) | Fetch all quotes inside a movie by default, if params are passed then quotes will be fetched based on params.
| getQuotes | params (optional) | Fetch all quotes by default, if params are passed then quotes will be fetched based on params.
| getQuoteById | id (required) | Fetch quote by id

## Params

```typescript
export interface IParams {
  limit?: number
  page?: number
  sort?: IFilterInput
  filter?: IFilter
}

export interface IFilter {
  eq?: IFilterInput
  ne?: IFilterInput
  contains?: IFilterInput
  notContains?: IFilterInput
  lt?: IFilterInput
  gt?: IFilterInput
  lte?: IFilterInput
  gte?: IFilterInput
  exists?: string
  notExists?: string
}

export interface IFilterInput {
  key: string
  value: SortEnum | string | string[] | number | RegExp
}

enum SortEnum {
  asc = 'asc',
  desc = 'desc'
}
```

## Examples

### Get Movies List

#### Query
```javascript
const params = {
    limit: 5,
    page: 1,
    sort: {
      key: 'academyAwardWins',
      value: 'desc'
    },
    filter: {
      gte: {
        key: 'budgetInMillions',
        value: 100
      },
      lte: {
        key: 'budgetInMillions',
        value: 200
      },
    }
  }
try{
  const result = await lotrSdk.movies.getMovies(params)
} catch(error){
  console.log(error)
}
```
#### Response 
```javascript
  {
    total: 8,
    limit: 5,
    page: 1,
    pages: 2,
    docs: [
      {...}
    ]
  }
```

### Get Movies By ID

#### Query
```javascript
const id = 'give movie id here'
try{
  const response = await lotrSdk.movies.getMovieById(id)
}catch(error){
  console.log(error)
}
```
#### Response 
```javascript
  {
    total: 8,
    limit: 5,
    page: 1,
    pages: 2,
    docs: [
      {...}
    ]
  }
```# kyle-SDK
