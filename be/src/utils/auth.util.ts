const hashPassword = async (password: string) =>
  await globalThis.Bun.password.hash(password)

const isPasswordValid = async (pass: string, hashedPass: string) =>
  await globalThis.Bun.password.verify(pass, hashedPass)

export { hashPassword, isPasswordValid }
