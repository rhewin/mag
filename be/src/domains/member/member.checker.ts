import { t } from 'elysia'
import * as validator from '@/base/checker.base'

const memberStatus = {
  active: 'active',
  inactive: 'inactive',
  onreview: 'onreview',
}

const add = {
  body: t.Object({
    fullname: validator.fullnameRule(),
    nickname: validator.nicknameRule(),
    email: validator.emailRule(),
    phone: validator.phoneRule(),
  }),
}

const edit = {
  body: t.Object({
    fullname: t.Optional(validator.fullnameRule()),
    nickname: t.Optional(validator.nicknameRule()),
    email: t.Optional(validator.emailRule()),
    phone: t.Optional(validator.phoneRule()),
    status: t.Optional(validator.statusRule(memberStatus)),
  }),
}

export default {
  add,
  edit,
}
