import { t } from 'elysia'
import * as validator from '@/base/validator.base'

const MemberStatus = {
  active: 'active',
  inactive: 'inactive',
  onreview: 'onreview',
}

export const createMemberValidation = {
  body: t.Object({
    fullname: validator.fullnameRule(),
    nickname: validator.nicknameRule(),
    email: validator.emailRule(),
    phone: validator.phoneRule(),
  }),
}

export const updateMemberValidation = {
  body: t.Object({
    fullname: t.Optional(validator.fullnameRule()),
    nickname: t.Optional(validator.nicknameRule()),
    email: t.Optional(validator.emailRule()),
    phone: t.Optional(validator.phoneRule()),
    status: t.Optional(validator.statusRule(MemberStatus)),
  }),
}
