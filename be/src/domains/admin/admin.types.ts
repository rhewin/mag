export interface ReqLogin {
  email: string
  password: string
}

export interface ReqPagination {
  pageNum?: number
  perPage?: number
}

export interface ReqCreateAdmin {
  email: string
  password: string
  fullname: string
  nickname: string
}

export interface ReqUpdateAdmin {
  email?: string
  password?: string
  fullname?: string
  nickname?: string
  status?: string
}
