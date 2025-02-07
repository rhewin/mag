-- CreateTable
CREATE TABLE "admins" (
    "id" SERIAL NOT NULL,
    "uuid" VARCHAR(50) NOT NULL,
    "internal_id" VARCHAR(10) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "fullname" VARCHAR(100) NOT NULL,
    "nickname" VARCHAR(50),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "admins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "members" (
    "id" SERIAL NOT NULL,
    "internal_id" VARCHAR(10) NOT NULL,
    "fullname" VARCHAR(100) NOT NULL,
    "nickname" VARCHAR(50),
    "email" VARCHAR(255),
    "phone" VARCHAR(20),
    "status" VARCHAR(20) NOT NULL DEFAULT 'onreview',
    "modified_by" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "members_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "admins_uuid_key" ON "admins"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "admins_internal_id_key" ON "admins"("internal_id");

-- CreateIndex
CREATE UNIQUE INDEX "admins_email_key" ON "admins"("email");

-- CreateIndex
CREATE INDEX "idx_admin_fullname" ON "admins"("fullname");

-- CreateIndex
CREATE INDEX "idx_admin_nickname" ON "admins"("nickname");

-- CreateIndex
CREATE UNIQUE INDEX "members_internal_id_key" ON "members"("internal_id");

-- CreateIndex
CREATE UNIQUE INDEX "members_email_key" ON "members"("email");

-- CreateIndex
CREATE UNIQUE INDEX "members_phone_key" ON "members"("phone");

-- CreateIndex
CREATE INDEX "idx_member_fullname" ON "members"("fullname");

-- CreateIndex
CREATE INDEX "idx_member_nickname" ON "members"("nickname");

-- CreateIndex
CREATE INDEX "idx_category_name" ON "categories"("name");
