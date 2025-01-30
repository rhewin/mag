export interface IAdminRequest {
  uuid: string;
  adminId: string;
  email: string;
  password: string;
  firstname: string;
  lastname?: string;
}

export type IAdminRequestCreate = IAdminRequest;
export type IAdminRequestUpdate = IAdminRequest;

export interface IAdminResult {
  isSuccess: boolean;
  message: string | null;
  data: any;
  errorDetail: any;
}
