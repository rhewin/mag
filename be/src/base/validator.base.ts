import { t } from 'elysia'

const minName = 3
const maxName = 50

export const fullnameRule = () =>
  t.String({
    minLength: minName,
    maxLength: maxName,
    error: {
      message: `[fullname] must be between ${minName} and ${maxName} characters`,
    },
  })

export const nicknameRule = () =>
  t.String({
    minLength: minName,
    maxLength: maxName,
    error: {
      message: `[nickname] must be between ${minName} and ${maxName} characters`,
    },
  })

export const emailRule = () =>
  t.String({
    format: 'email',
    error: { message: '[email] invalid format' },
  })

export const statusRule = (status: any) =>
  t.Enum(status, {
    error: { message: '[status] invalid value' },
  })
