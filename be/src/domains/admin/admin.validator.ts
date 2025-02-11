import { t } from 'elysia'
import * as validator from '@/base/validator.base'

const AdminStatus = {
  active: 'active',
  inactive: 'inactive',
}

export const loginValidation = {
  body: t.Object({
    email: validator.emailRule(),
    password: validator.strongPasswordRule(),
  }),
}

export const createValidation = {
  body: t.Object({
    fullname: validator.fullnameRule(),
    nickname: validator.nicknameRule(),
    email: validator.emailRule(),
    password: validator.strongPasswordRule(),
  }),
}

export const updateValidation = {
  body: t.Object({
    fullname: t.Optional(validator.fullnameRule()),
    nickname: t.Optional(validator.nicknameRule()),
    email: t.Optional(validator.emailRule()),
    status: t.Optional(validator.statusRule(AdminStatus)),
  }),
}
