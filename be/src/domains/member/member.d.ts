export interface IReqPagination {
  pageNum?: number
  perPage?: number
}

export interface IReqCreateMember {
  fullname: string
  nickname: string
  email?: string
  phone?: string
}

export interface IReqUpdateMember {
  fullname?: string
  nickname?: string
  email?: string
  phone?: string
  status?: string
}
