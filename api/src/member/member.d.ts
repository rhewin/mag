export interface IMemberRequest {
  memberId: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  status: "active" | "inactive";
  modifiedBy: number;
}
export type IMemberRequestCreate = IMemberRequest;
export type IMemberRequestUpdate = IMemberRequest;

export interface IMemberResult {
  isSuccess: boolean;
  message: string | null;
  data: any;
  errorDetail: any;
}
