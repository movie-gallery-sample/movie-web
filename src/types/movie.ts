export interface Movie {
  id: string;
  title: string;
  year: string;
  poster: string;
}

export enum Order {
  ASC = "asc",
  DESC = "desc",
}

export enum SortType {
  TITLE = "title",
  YEAR = "publishingYear",
}

export interface Params {
  page: number;
  limit: number;
  search?: string;
  sort?: SortType;
  order?: Order;
}
