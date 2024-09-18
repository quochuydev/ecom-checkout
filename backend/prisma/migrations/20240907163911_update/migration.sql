-- CreateTable
CREATE TABLE "_FileToProduct" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_FileToProduct_AB_unique" ON "_FileToProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_FileToProduct_B_index" ON "_FileToProduct"("B");

-- AddForeignKey
ALTER TABLE "_FileToProduct" ADD CONSTRAINT "_FileToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "File"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FileToProduct" ADD CONSTRAINT "_FileToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
