import ExamView from '@/components/ExamView';
import prisma from '../db/prisma';

export default async function Home() {
  const exams = await prisma.exam.findMany();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900 font-sans">
      
      <main className="container mx-auto px-6 py-12">
        <ExamView exams={exams}/>
      </main>
    </div>
  );
}
