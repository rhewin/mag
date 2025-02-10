import { PrismaClient } from '@prisma/client'
import { generateUUID7, generatePIN } from '@/utils/helper.util'
import { hashPassword } from '@/utils/auth.util'

const prisma = new PrismaClient()

async function main() {
  await prisma.admin.createMany({
    data: [
      {
        uuid: generateUUID7(),
        internalId: `A${generatePIN()}`,
        email: 'superadmin@abc.com',
        password: await hashPassword('Test1234'),
        fullname: 'Super Admin',
        nickname: 'Superadmin',
        modifiedBy: '0000000000',
      },
    ],
  })

  console.log('Seeded admins')

  await prisma.category.createMany({
    data: [
      { name: 'Lainnya' },
      { name: 'Novel' },
      { name: 'Bisnis & Ekonomi' },
      { name: 'Komik' },
      { name: 'Seni & Budaya' },
      { name: 'Pelajaran Sekolah' },
      { name: 'Majalah & Koran' },
      { name: 'Politik' },
      { name: 'Teknologi' },
    ],
  })

  console.log('Seeded categories')
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  })
