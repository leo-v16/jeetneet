import ExamView from '@/components/ExamView';

type Exam = {
  name: string,
  description: string,
  popularity: number
}

const exams: Exam[] = [
  { name: 'JEE Main', description: 'Joint Entrance Examination for Engineering', popularity: 9 },
  { name: 'NEET UG', description: 'National Eligibility cum Entrance Test for Medical', popularity: 10 },
  { name: 'CBSE', description: 'Central Board of Secondary Education', popularity: 8 },
  { name: 'ICSE', description: 'Indian Certificate of Secondary Education', popularity: 7 },
  { name: 'CUET', description: 'Common University Entrance Test', popularity: 6 },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900 font-sans">
      
      <main className="container mx-auto px-6 py-12">
        <ExamView exams={exams}/>
      </main>
    </div>
  );
}
