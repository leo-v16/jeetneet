
import React from 'react';

export default function ComingSoon() {
  return (
    <div className="flex flex-col justify-center items-center text-white p-4 h-full">
      <div className="max-w-md text-center">
        <div className="mb-8">
          <svg className="mx-auto h-24 w-24 text-blue-400 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 className="text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-300">
          Coming Soon
        </h1>
        <p className="text-lg text-gray-400 mb-8">
          We're working hard to bring you something amazing. Stay tuned!
        </p>
        <div className="flex justify-center space-x-4">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  );
}
