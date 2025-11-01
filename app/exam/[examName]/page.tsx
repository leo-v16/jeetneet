import Link from "next/link";

const options = [
  { name: "PYQ", description: "Previous Year Questions", href: "pyq" },
  { name: "Notes", description: "Chapter-wise notes", href: "../../coming-soon" },
  { name: "Mindmaps", description: "Visual learning aids", href: "../../coming-soon" },
  { name: "Syllabus", description: "Detailed syllabus", href: "../../coming-soon" },
  { name: "Mock Tests", description: "Practice tests", href: "../../coming-soon" },
];

export default async function ExamPage({ params }: { params: Promise<{ examName: string }> }) {
  const { examName } = await params;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900 font-sans">
      <header className="bg-white dark:bg-gray-800 shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-400 dark:to-indigo-500">
            A&A
          </h1>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
          {decodeURIComponent(examName)}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {options.map((option) => (
            <Link
              key={option.name}
              href={`/exam/${examName}/${option.href}`}
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
