export interface IReqCreateMember {
  fullname: string;
  nickname: string;
  email?: string;
  phone?: string;
}

export type IReqUpdateMember = IReqCreateMember;
