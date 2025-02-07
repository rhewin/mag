import { prisma, BaseQuery } from "@/base/query.base";

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
    };

    super(prisma.member, visibleFields);
  }

  getByInternalId = async (internalId: string) =>
    this.table.findUnique({
      select: {
        id: true,
      },
      where: {
        internalId,
      },
    });

  genInternalId = async (): Promise<string> => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let pin: string;
    let exists: boolean;

    do {
      pin = Array.from(
        { length: 9 },
        () => chars[Math.floor(Math.random() * chars.length)]
      ).join("");
      exists = !!(await this.getByInternalId(`M${pin}`));
    } while (exists);

    return `M${pin}`;
  };
}

export const memberQuery = new MemberQuery();
