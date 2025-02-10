import { t } from 'elysia'
import * as validator from '@/base/validator.base'

const AdminStatus = {
  active: 'active',
  inactive: 'inactive',
}

export const createAdminValidation = {
  body: t.Object({
    fullname: validator.fullnameRule(),
    nickname: validator.nicknameRule(),
    email: validator.emailRule(),
    password: t.String(),
  }),
}

export const updateAdminValidation = {
  body: t.Object({
    fullname: t.Optional(validator.fullnameRule()),
    nickname: t.Optional(validator.nicknameRule()),
    email: t.Optional(validator.emailRule()),
    status: t.Optional(validator.statusRule(AdminStatus)),
  }),
}
