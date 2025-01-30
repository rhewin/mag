import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
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
  });

  console.log('Seeded book categories');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
