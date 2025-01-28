export interface IBookRequest {
  title: string;
  author: string;
  isbn: string;
  quantity: number;
  categoryId: number;
  modifiedBy: number;
}
export type IBookRequestCreate = IBookRequest;
export type IBookRequestUpdate = IBookRequest;

export interface IBookResult {
  isSuccess: boolean;
  message: string | null;
  data: any;
  errorDetail: any;
}
