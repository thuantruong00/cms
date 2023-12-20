-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "fullname" TEXT NOT NULL DEFAULT '',
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "last_login_time" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_login_ip" TEXT NOT NULL DEFAULT '',
    "status" TEXT NOT NULL DEFAULT 'active',
    "type" TEXT NOT NULL DEFAULT 'admin'
);

-- CreateTable
CREATE TABLE "page" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "status" TEXT NOT NULL DEFAULT 'active',
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "user_id" TEXT NOT NULL,
    CONSTRAINT "page_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "section_of_page" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL DEFAULT '',
    "type" TEXT NOT NULL,
    "class" TEXT NOT NULL DEFAULT '',
    "display" BOOLEAN NOT NULL DEFAULT true,
    "attr_href" TEXT NOT NULL DEFAULT '',
    "updated_at" DATETIME NOT NULL,
    "page_id" INTEGER NOT NULL,
    CONSTRAINT "section_of_page_page_id_fkey" FOREIGN KEY ("page_id") REFERENCES "page" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "image" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "file_name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "resolution" TEXT NOT NULL DEFAULT '',
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,
    "image_of_product_id" INTEGER,
    CONSTRAINT "image_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "image_image_of_product_id_fkey" FOREIGN KEY ("image_of_product_id") REFERENCES "image_of_product" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "post" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "excerpt" TEXT NOT NULL DEFAULT '',
    "content" TEXT NOT NULL DEFAULT '',
    "status" TEXT NOT NULL DEFAULT 'active',
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "user_id" TEXT NOT NULL,
    "image_id" INTEGER,
    CONSTRAINT "post_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "post_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "image" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "category_of_post" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "user_id" TEXT NOT NULL,
    CONSTRAINT "category_of_post_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "categories_on_posts" (
    "post_id" INTEGER NOT NULL,
    "post_category_id" INTEGER NOT NULL,

    PRIMARY KEY ("post_id", "post_category_id"),
    CONSTRAINT "categories_on_posts_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "post" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "categories_on_posts_post_category_id_fkey" FOREIGN KEY ("post_category_id") REFERENCES "category_of_post" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "detail" TEXT NOT NULL DEFAULT '',
    "price" INTEGER NOT NULL DEFAULT 0,
    "stock_status" TEXT NOT NULL DEFAULT 'on-stock',
    "stock_quantity" INTEGER NOT NULL DEFAULT 0,
    "order" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'active',
    "unit" TEXT NOT NULL,
    "is_sale_off" BOOLEAN NOT NULL DEFAULT false,
    "sale_off_desc" TEXT NOT NULL DEFAULT '',
    "label" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "user_id" TEXT NOT NULL,
    CONSTRAINT "product_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "category_of_product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "user_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "parent_id" INTEGER,
    CONSTRAINT "category_of_product_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "category_of_product_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "category_of_product" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "categories_on_products" (
    "product_id" TEXT NOT NULL,
    "product_category_id" INTEGER NOT NULL,

    PRIMARY KEY ("product_id", "product_category_id"),
    CONSTRAINT "categories_on_products_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "categories_on_products_product_category_id_fkey" FOREIGN KEY ("product_category_id") REFERENCES "category_of_product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "image_of_product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "order" INTEGER NOT NULL,
    "product_id" TEXT NOT NULL,
    CONSTRAINT "image_of_product_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "page_name_key" ON "page"("name");

-- CreateIndex
CREATE UNIQUE INDEX "category_of_product_parent_id_key" ON "category_of_product"("parent_id");
