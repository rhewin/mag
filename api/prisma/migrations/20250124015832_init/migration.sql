-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "adminId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Member" (
    "id" SERIAL NOT NULL,
    "memberId" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "status" TEXT NOT NULL DEFAULT 'active',
    "modifiedBy" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Book" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "isbn" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "modifiedBy" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lending" (
    "id" SERIAL NOT NULL,
    "bookId" INTEGER NOT NULL,
    "memberId" INTEGER NOT NULL,
    "borrowedDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "returnDate" TIMESTAMP(3),
    "status" TEXT NOT NULL DEFAULT 'borrowed',
    "modifiedBy" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Lending_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookStatus" (
    "id" SERIAL NOT NULL,
    "bookId" INTEGER NOT NULL,
    "availableQty" INTEGER NOT NULL,
    "borrowedQty" INTEGER NOT NULL,

    CONSTRAINT "BookStatus_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_uuid_key" ON "Admin"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_adminId_key" ON "Admin"("adminId");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- CreateIndex
CREATE INDEX "idx_admin_email" ON "Admin"("email");

-- CreateIndex
CREATE INDEX "idx_admin_adminId" ON "Admin"("adminId");

-- CreateIndex
CREATE INDEX "idx_admin_firstname" ON "Admin"("firstname");

-- CreateIndex
CREATE INDEX "idx_admin_lastname" ON "Admin"("lastname");

-- CreateIndex
CREATE UNIQUE INDEX "Member_memberId_key" ON "Member"("memberId");

-- CreateIndex
CREATE INDEX "idx_member_email" ON "Member"("email");

-- CreateIndex
CREATE INDEX "idx_member_memberId" ON "Member"("memberId");

-- CreateIndex
CREATE INDEX "idx_member_firstname" ON "Member"("firstname");

-- CreateIndex
CREATE INDEX "idx_member_lastname" ON "Member"("lastname");

-- CreateIndex
CREATE INDEX "idx_member_phone" ON "Member"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Book_isbn_key" ON "Book"("isbn");

-- CreateIndex
CREATE INDEX "idx_book_title" ON "Book"("title");

-- CreateIndex
CREATE INDEX "idx_book_author" ON "Book"("author");

-- CreateIndex
CREATE INDEX "idx_book_isbn" ON "Book"("isbn");

-- CreateIndex
CREATE INDEX "idx_book_categoryId" ON "Book"("categoryId");

-- CreateIndex
CREATE INDEX "idx_name" ON "Category"("name");

-- CreateIndex
CREATE INDEX "idx_lending_book_member" ON "Lending"("bookId", "memberId");

-- CreateIndex
CREATE UNIQUE INDEX "BookStatus_bookId_key" ON "BookStatus"("bookId");

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lending" ADD CONSTRAINT "Lending_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lending" ADD CONSTRAINT "Lending_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookStatus" ADD CONSTRAINT "BookStatus_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
