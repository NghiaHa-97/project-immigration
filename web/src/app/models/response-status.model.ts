export interface ResponseStatusModel {
  status: string | null;
  message: string | null;
  totalPage: number | null;
  pageNumber: number | null;
  pageSize: number | null;
  totalElements: number | null;
  // data: any;
}

export function createEmptyResponseStatusModel(): ResponseStatusModel {
  return {
    status: null,
    message: null,
    totalPage: null,
    pageNumber: null,
    pageSize: null,
    totalElements: null,
    // data: null
  };
}
