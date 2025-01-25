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

export interface IResult {
  isSuccess: boolean;
  msg: string | null;
  data: any;
  errorDetail: any;
}
