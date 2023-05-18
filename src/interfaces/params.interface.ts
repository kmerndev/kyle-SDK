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

enum SortEnum {
  asc = 'asc',
  desc = 'desc'
}

export interface IFilterInput {
  key: string
  value: SortEnum | string | string[] | number | RegExp
}