"use client"

import { useState } from 'react';
import Fuse from 'fuse.js';

type Exam = {
  name: string,
  description: string,
  popularity: number
}

function ExamCard({ name: examName, description: examDescription }: Pick<Exam, 'name' | 'description'>) {
  return (
    <div className="transform hover:scale-105 transition-transform duration-300 bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
      <div className="p-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-3xl text-center font-bold">
        {examName}
      </div>
      <div className="p-6 text-center">
        <p className="text-gray-600 dark:text-gray-300 mt-2">{examDescription}</p>
      </div>
    </div>
  )
}

const exams: Exam[] = [
  { name: 'JEE Main', description: 'Joint Entrance Examination for Engineering', popularity: 9 },
  { name: 'NEET UG', description: 'National Eligibility cum Entrance Test for Medical', popularity: 10 },
  { name: 'CBSE', description: 'Central Board of Secondary Education', popularity: 8 },
  { name: 'ICSE', description: 'Indian Certificate of Secondary Education', popularity: 7 },
  { name: 'CUET', description: 'Common University Entrance Test', popularity: 6 },
];

const fuse = new Fuse(exams, {
  keys: ['name', 'description'],
  includeScore: true,
  shouldSort: true,
  // @ts-ignore
  sortFn: (a, b) => {
    if (a.score === b.score) {
      return Number(b.item.popularity) - Number(a.item.popularity);
    }
    return Number(a.score) - Number(b.score);
  }
});

export default function Home() {
  const [query, setQuery] = useState('');

  const searchResults = query ? fuse.search(query).map(result => result.item) : exams;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900 font-sans">
      <header className="bg-white dark:bg-gray-800 shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-400 dark:to-indigo-500">A&A</h1>
        </div>
      </header>
      <main className="container mx-auto px-6 py-12">
        <div className="sticky top-0 z-10 mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for exams..."
              className="w-full px-6 py-4 text-lg text-gray-700 bg-white dark:bg-gray-700 dark:text-gray-200 border-2 border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-500 transition-shadow duration-300 shadow-md"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-6">
              <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {searchResults.map((exam) => (
            <ExamCard key={exam.name} name={exam.name} description={exam.description} />
          ))}
        </div>
      </main>
    </div>
  );
}
