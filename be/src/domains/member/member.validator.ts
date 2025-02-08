import { t } from 'elysia'
import cfg from '@/config'

export const createMemberValidation = {
  body: t.Object({
    fullname: t.String({
      minLength: 3,
      maxLength: 50,
      error: { message: 'Fullname must be between 3 and 50 characters' },
    }),
    nickname: t.String({
      minLength: 3,
      maxLength: 50,
      error: { message: 'Nickname must be between 3 and 50 characters' },
    }),
    email: t.String({
      format: 'email',
      error: { message: 'Must valid email address' },
    }),
    phone: t.String({
      pattern: cfg.REGEX_FORMAT_PHONE,
      minLength: 10,
      maxLength: 15,
      error: { message: 'Must valid phone number' },
    }),
  }),
}

export const updateMemberValidation = {
  body: t.Partial(createMemberValidation.body),
}
