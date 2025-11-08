-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ExamYear" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "year" INTEGER NOT NULL,
    "pdfUrl" TEXT,
    "examId" INTEGER NOT NULL,
    CONSTRAINT "ExamYear_examId_fkey" FOREIGN KEY ("examId") REFERENCES "Exam" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ExamYear" ("examId", "id", "pdfUrl", "year") SELECT "examId", "id", "pdfUrl", "year" FROM "ExamYear";
DROP TABLE "ExamYear";
ALTER TABLE "new_ExamYear" RENAME TO "ExamYear";
CREATE UNIQUE INDEX "ExamYear_examId_year_key" ON "ExamYear"("examId", "year");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
