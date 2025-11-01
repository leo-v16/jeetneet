"use client"

import Link from 'next/link';
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


export default function ExamView({ exams }: { exams: Exam[] }) {
    const [query, setQuery] = useState('');

    const fuse: Fuse<Exam> = new Fuse(exams, {
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

    const searchResults = query ? fuse.search(query).map(result => result.item) : exams.sort((a, b) => b.popularity - a.popularity);

    return (
        <>
            <div className="sticky top-0 z-10 mb-12">
                <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-md border-b-4 border-blue-500 dark:border-indigo-600">
                    <input
                        type="text"
                        placeholder="Search for exams..."
                        className="w-full px-6 py-4 text-lg text-gray-700 bg-transparent dark:text-gray-200 focus:outline-none"
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
                    <Link key={exam.name} href={`/exam/${encodeURIComponent(exam.name)}`}>
                        <ExamCard name={exam.name} description={exam.description} />
                    </Link>
                ))}
            </div>
        </>

    )
}