
"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  const isHomePage = pathname === "/";

  return (
    <header
      className={`bg-white dark:bg-gray-800 shadow-lg ${
        !isHomePage ? "sticky top-0 z-10" : ""
      }`}
    >
      <div className="container mx-auto px-6 py-4 flex items-center">
        {!isHomePage && (
          <button
            onClick={() => router.back()}
            className="mr-4 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        )}
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-400 dark:to-indigo-500">
          <Link href="/">A&A</Link>
        </h1>
      </div>
    </header>
  );
}
