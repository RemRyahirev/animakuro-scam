-- CreateTable
CREATE TABLE "user_collection_markdown" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "markdown" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_collection_markdown_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_collection_markdown_user_id_key" ON "user_collection_markdown"("user_id");

-- AddForeignKey
ALTER TABLE "user_collection_markdown" ADD CONSTRAINT "user_collection_markdown_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
