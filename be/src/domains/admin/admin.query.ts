import { prisma, BaseQuery } from '@/base/query.base'
import { generatePIN } from '@/utils/helper.util'

export class AdminQuery extends BaseQuery {
  constructor() {
    const visibleFields = {
      uuid: true,
      internalId: true,
      email: true,
      fullname: true,
      nickname: true,
      createdAt: true,
    }

    super(prisma.admin, visibleFields)
  }

  getPasswordByEmail = async (email: string) => {
    return this.table.findFirst({
      select: {
        uuid: true,
        internalId: true,
        password: true,
      },
      where: {
        email,
        deletedAt: null,
      },
    })
  }

  getByInternalId = async (internalId: string) =>
    this.table.findUnique({
      select: {
        id: true,
      },
      where: {
        internalId,
      },
    })

  generateInternalId = async (): Promise<string> => {
    let pin: string
    let exists: boolean

    do {
      pin = generatePIN()
      exists = !!(await this.getByInternalId(`A${pin}`))
    } while (exists)

    return `A${pin}`
  }
}

export const adminQuery = new AdminQuery()
