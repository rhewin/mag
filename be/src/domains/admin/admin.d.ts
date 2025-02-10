export interface IReqLogin {
  email: string
  password: string
}

export interface IReqPagination {
  pageNum?: number
  perPage?: number
}

export interface IReqCreateAdmin {
  email: string
  password: string
  fullname: string
  nickname: string
}

export interface IReqUpdateAdmin {
  email?: string
  password?: string
  fullname?: string
  nickname?: string
  status?: string
}
