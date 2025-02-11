import { t } from 'elysia'
import cfg from '@/config'

const minName = cfg.VALIDATION.MIN_NAME
const maxName = cfg.VALIDATION.MAX_NAME
const minPhone = cfg.VALIDATION.MIN_PHONE
const maxPhone = cfg.VALIDATION.MAX_PHONE
const formatPhone = cfg.VALIDATION.REGEX_FORMAT_PHONE

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

export const phoneRule = () =>
  t.String({
    pattern: formatPhone,
    minLength: minPhone,
    maxLength: maxPhone,
    error: { message: '[phone] invalid format' },
  })

export const statusRule = (status: any) =>
  t.Enum(status, {
    error: { message: '[status] invalid value' },
  })
