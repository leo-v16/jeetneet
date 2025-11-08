import prisma from '@/db/prisma';
import QuestionPaperClientPage from './client-page';
export default async function Page({ params }: { params: Promise<{ examName: string; year: string }> }) {
  const { examName, year } = await params; // ✅ unwrap the promise

  const decodedExamName = decodeURIComponent(examName);
  const parsedYear = parseInt(year, 10);

  const exam = await prisma.exam.findUnique({
    where: { name: decodedExamName },
  });

  if (!exam) return <div className="text-center text-red-500">Exam not found.</div>;

  const examYear = await prisma.examYear.findUnique({
    where: { examId_year: { examId: exam.id, year: parsedYear } },
  });

  if (!examYear) return <div className="text-center text-red-500">Year not found for this exam.</div>;

  const pyqs = await prisma.pYQ.findMany({
    where: { examId: exam.id, yearId: examYear.id },
  });

  return (
    <QuestionPaperClientPage
      exam={exam}
      examYear={examYear}
      pyqs={pyqs}
      decodedExamName={decodedExamName}
      year={year}
    />
  );
}
