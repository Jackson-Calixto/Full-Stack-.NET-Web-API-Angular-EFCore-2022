export class Pagination {
  currentPage?: number;
  pageSize: number = 0;
  totalCount: number = 0;
  totalPages?: number;
}

export class PaginatedResult<T>{
  result!: T;
  pagination: Pagination = {currentPage: 0, pageSize:0,totalCount:0,totalPages:0};
}
