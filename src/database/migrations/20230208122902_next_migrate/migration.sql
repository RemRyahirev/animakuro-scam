-- CreateTable
CREATE TABLE "IpList" (
    "ip" TEXT NOT NULL,
    "banTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "IpList_ip_key" ON "IpList"("ip");
