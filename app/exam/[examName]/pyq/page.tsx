import React from "react";

export default async function PYQPage({
  params,
}: {
  params: Promise<{ examName: string }>;
}) {
  const { examName } = await params;

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2010 + 1 }, (_, i) => 2010 + i).reverse();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900 font-sans">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-400 dark:to-indigo-500">
            A&A
          </h1>
        </div>
      </header>

      {/* Main */}
      <main className="container mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
          {decodeURIComponent(examName)} Previous Year Questions
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {years.map((year) => (
            <div
              key={year}
              className="transform hover:scale-105 transition-transform duration-300 bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="p-6 text-center">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                  {year}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
