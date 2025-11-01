/*
  Warnings:

  - A unique constraint covering the columns `[examId,year]` on the table `ExamYear` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "ExamYear_year_key";

-- CreateIndex
CREATE UNIQUE INDEX "ExamYear_examId_year_key" ON "ExamYear"("examId", "year");
