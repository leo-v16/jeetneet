import Link from "next/link";
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
      

      {/* Main */}
      <main className="container mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
          {decodeURIComponent(examName)} Previous Year Questions
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {years.map((year) => (
            <Link key={year} href={`/exam/${examName}/pyq/${year}`}>
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
          </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
