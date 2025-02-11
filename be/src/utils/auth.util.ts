import cfg from '@/config'

const hashPassword = async (password: string) =>
  await globalThis.Bun.password.hash(password, cfg.HASH_ARGON)

const isPasswordValid = async (pass: string, hashedPass: string) =>
  await globalThis.Bun.password.verify(pass, hashedPass)

export { hashPassword, isPasswordValid }
