import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { hashedPassword } from '../src/utils/util.auth';

const prisma = new PrismaClient();

async function main() {
  // Generate sample Admin data
  const adminDataPromises = Array.from({ length: 10 }).map(async () => ({
    uuid: faker.string.uuid(),
    adminId: faker.finance.pin(8),
    email: faker.internet.email(),
    password: await hashedPassword('test1234'),
    firstname: faker.person.firstName(),
    lastname: faker.person.lastName(),
  }));

  // Generate sample Member data
  const memberData = Array.from({ length: 10 }).map(() => ({
    memberId: faker.finance.pin(8),
    firstname: faker.person.firstName(),
    lastname: faker.person.lastName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    status: 'active',
    modifiedBy: faker.number.int({ min: 1, max: 10 }),
  }));

  // Generate sample Book data
  const bookData = Array.from({ length: 20 }).map(() => ({
    title: faker.book.title(),
    author: faker.person.fullName(),
    isbn: faker.commerce.isbn(),
    quantity: faker.number.int({ min: 99, max: 99 }),
    categoryId: faker.number.int({ min: 2, max: 9 }),
    modifiedBy: faker.number.int({ min: 1, max: 10 }),
  }));

  // Generate sample BookStatus data
  const bookIds = Array.from({ length: 20 }, (_, i) => i + 1);
  const bookStatusData = bookIds.map((id) => ({
    bookId: id,
    availableQty: faker.number.int({ min: 99, max: 99 }),
    borrowedQty: faker.number.int({ min: 0, max: 0 }),
  }));

  // Insert data into the database
  const adminData = await Promise.all(adminDataPromises);
  await prisma.admin.createMany({ data: adminData });
  await prisma.member.createMany({ data: memberData });
  await prisma.book.createMany({ data: bookData });
  await prisma.bookStatus.createMany({ data: bookStatusData });

  // Generate sample Lending data
  for (let i = 1; i <= 50; i++) {
    const borrowedDate = faker.date.recent({ days: 90 });
    const dueDate = new Date(borrowedDate);
    dueDate.setDate(dueDate.getDate() + 7); // Adding 7 days to borrowedDate

    await prisma.lending.create({
      data: {
        bookId: faker.number.int({ min: 1, max: 20 }),
        memberId: faker.number.int({ min: 1, max: 10 }),
        borrowedDate,
        dueDate,
        status: 'borrowed',
        modifiedBy: faker.number.int({ min: 1, max: 10 }),
      },
    });
  }

  console.log('Sample data has been seeded.');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
