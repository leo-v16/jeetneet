import prisma from '@/db/prisma';

export default async function QuestionPaperPage({
  params,
}: {
  params: Promise<{ examName: string; year: string }>;
}) {
  const { examName, year } = await params;

  const decodedExamName = decodeURIComponent(examName);
  const parsedYear = parseInt(year, 10);

  const exam = await prisma.exam.findUnique({
    where: { name: decodedExamName },
  });

  if (!exam) {
    return <div className="text-center text-red-500">Exam not found.</div>;
  }

  const examYear = await prisma.examYear.findUnique({
    where: { examId_year: { examId: exam.id, year: parsedYear } },
  });

  if (!examYear) {
    return <div className="text-center text-red-500">Year not found for this exam.</div>;
  }

  const pyqs = await prisma.pYQ.findMany({
    where: { examId: exam.id, yearId: examYear.id },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900 font-sans">
      <main className="container mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
          {decodedExamName} - {year} PYQs
        </h2>

        <div className="space-y-8">
          {pyqs.length === 0 ? (
            <p className="text-center text-gray-600 dark:text-gray-300">No PYQs found for this year.</p>
          ) : (
            pyqs.map((pyq, index) => (
              <div key={pyq.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Question {index + 1}</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">{pyq.question}</p>
                <h4 className="text-lg font-bold text-gray-800 dark:text-white mb-2">Answer:</h4>
                <p className="text-gray-700 dark:text-gray-300">{pyq.answer}</p>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
