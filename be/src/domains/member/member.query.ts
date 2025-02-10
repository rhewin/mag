import { prisma, BaseQuery } from '@/base/query.base'
import { generatePIN } from '@/utils/helper.util'

export class MemberQuery extends BaseQuery {
  constructor() {
    const visibleFields = {
      internalId: true,
      fullname: true,
      nickname: true,
      email: true,
      phone: true,
      status: true,
      createdAt: true,
    }

    super(prisma.member, visibleFields)
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
      exists = !!(await this.getByInternalId(`M${pin}`))
    } while (exists)

    return `M${pin}`
  }
}

export const memberQuery = new MemberQuery()
