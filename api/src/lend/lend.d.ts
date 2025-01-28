export type StatusType = "borrowed" | "returned" | "returned-late";

export interface ILendRequest {
  bookId: number;
  memberId: number;
  borrowedDate: Date;
  dueDate: Date;
  returnDate?: Date;
  status: "borrowed" | "returned" | "returned-late";
  modifiedBy: number;
}
export type ILendRequestCreate = ILendRequest;
export type ILendRequestUpdate = ILendRequest;

export interface ILendResult {
  isSuccess: boolean;
  message: string | null;
  data: any;
  errorDetail: any;
}

export interface ILendApiRequestCreate {
  bookIsbn: string;
  memberId: number
}
export type ILendApiRequestUpdate = ILendApiRequestCreate;
