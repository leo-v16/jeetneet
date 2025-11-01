-- CreateTable
CREATE TABLE "Exam" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "popularity" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Exam_name_key" ON "Exam"("name");
