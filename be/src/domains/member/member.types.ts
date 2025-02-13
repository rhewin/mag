export interface ReqPagination {
  pageNum?: number
  perPage?: number
}

export interface ReqCreateMember {
  fullname: string
  nickname: string
  email?: string
  phone?: string
}

export interface ReqUpdateMember {
  fullname?: string
  nickname?: string
  email?: string
  phone?: string
  status?: string
}
