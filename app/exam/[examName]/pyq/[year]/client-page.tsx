'use client';

import { useState, useEffect } from 'react';

type Exam = {
  id: number;
  name: string;
  description: string;
  popularity: number;
};

type ExamYear = {
  id: number;
  year: number;
  pdfUrl?: string | null;
};

type PYQ = {
  id: number;
  question: string;
  answer: string;
};

interface QuestionPaperClientPageProps {
  exam: Exam;
  examYear: ExamYear;
  pyqs: PYQ[];
  decodedExamName: string;
  year: string;
}

export default function QuestionPaperClientPage({
  exam,
  examYear,
  pyqs,
  decodedExamName,
  year,
}: QuestionPaperClientPageProps) {
  console.log('props:', { exam, examYear, pyqs, decodedExamName, year });

  const getGoogleDrivePreviewLink = (url: string) => {
    const previewUrl = url.replace('/view?usp=sharing', '/preview');
    console.log('previewUrl:', previewUrl);
    return previewUrl;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900 font-sans">
      <main className="container mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
          {decodedExamName} - {year} PYQs
        </h2>

        {examYear?.pdfUrl ? (
          <div className="mb-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-4">Question Paper</h3>
            <div className="flex justify-center">
              <iframe src={getGoogleDrivePreviewLink(examYear.pdfUrl)} width="100%" height="600px" />
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-600 dark:text-gray-300">No Question Paper found for this year.</p>
        )}

        {(pyqs && pyqs.length === 0) ? (
          <p className="text-center text-gray-600 dark:text-gray-300">No PYQs found for this year.</p>
        ) : (
          <div className="space-y-8">
            {pyqs && pyqs.map((pyq, index) => (
              <div key={pyq.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Question {index + 1}</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">{pyq.question}</p>
                <h4 className="text-lg font-bold text-gray-800 dark:text-white mb-2">Answer:</h4>
                <p className="text-gray-700 dark:text-gray-300">{pyq.answer}</p>
              </div>
            ))
          }
          </div>
        )}
      </main>
    </div>
  );
}
