import { t } from 'elysia'
import cfg from '@/config'

const minName = 3
const maxName = 50
const minPhone = 10
const maxPhone = 15

const MemberStatus = {
  active: 'active',
  inactive: 'inactive',
  onreview: 'onreview',
}

export const createMemberValidation = {
  body: t.Object({
    fullname: t.String({
      minLength: minName,
      maxLength: maxName,
      error: {
        message: `[fullname] must be between ${minName} and ${maxName} characters`,
      },
    }),
    nickname: t.String({
      minLength: minName,
      maxLength: maxName,
      error: {
        message: `[nickname] must be between ${minName} and ${maxName} characters`,
      },
    }),
    email: t.String({
      format: 'email',
      error: { message: '[email] invalid format' },
    }),
    phone: t.String({
      pattern: cfg.REGEX_FORMAT_PHONE,
      minLength: minPhone,
      maxLength: maxPhone,
      error: { message: '[phone] invalid format' },
    }),
  }),
}

export const updateMemberValidation = {
  body: t.Object({
    fullname: t.Optional(
      t.String({
        minLength: minName,
        maxLength: maxName,
        error: {
          message: `[fullname] must be between ${minName} and ${maxName} characters`,
        },
      })
    ),
    nickname: t.Optional(
      t.String({
        minLength: minName,
        maxLength: maxName,
        error: {
          message: `[nickname] must be between ${minName} and ${maxName} characters`,
        },
      })
    ),
    email: t.Optional(
      t.String({
        format: 'email',
        error: { message: '[email] invalid format' },
      })
    ),
    phone: t.Optional(
      t.String({
        pattern: cfg.REGEX_FORMAT_PHONE,
        minLength: minPhone,
        maxLength: maxPhone,
        error: { message: '[phone] invalid format' },
      })
    ),
    status: t.Optional(
      t.Enum(MemberStatus, {
        error: { message: '[status] invalid value' },
      })
    ),
  }),
}
