import Link from "next/link";
import prisma from '@/db/prisma';

type ExamOption = {
  id: number;
  name: string;
  description: string;
  href: string;
  examId: number;
}

export default async function ExamPage({ params }: { params: Promise<{ examName: string }> }) {
  const { examName } = await params;

  const exam = await prisma.exam.findUnique({
    where: { name: decodeURIComponent(examName) },
    include: { options: true },
  });

  if (!exam) {
    return <div className="text-center text-red-500">Exam not found.</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900 font-sans">
      

      <main className="container mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
          {exam.name}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {exam.options.map((option: ExamOption) => (
            <Link
              key={option.name}
              href={`/exam/${exam.name}/${option.href}`}
            >
              <div className="transform hover:scale-105 transition-transform duration-300 bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
                <div className="p-6 text-center">
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                    {option.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mt-2">
                    {option.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
