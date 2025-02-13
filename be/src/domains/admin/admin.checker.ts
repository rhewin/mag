import { t } from 'elysia'
import * as validator from '@/base/checker.base'

const adminStatus = {
  active: 'active',
  inactive: 'inactive',
}

const add = {
  body: t.Object({
    fullname: validator.fullnameRule(),
    nickname: validator.nicknameRule(),
    email: validator.emailRule(),
    password: validator.strongPasswordRule(),
  }),
}

const edit = {
  body: t.Object({
    fullname: t.Optional(validator.fullnameRule()),
    nickname: t.Optional(validator.nicknameRule()),
    email: t.Optional(validator.emailRule()),
    status: t.Optional(validator.statusRule(adminStatus)),
  }),
}

const login = {
  body: t.Object({
    email: validator.emailRule(),
    password: validator.strongPasswordRule(),
  }),
}

export default {
  add,
  edit,
  login,
}
