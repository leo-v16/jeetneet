
import ComingSoon from '@/components/ComingSoon';

export default async function QuestionPaperPage({
  params,
}: {
  params: Promise<{ examName: string; year: string }>;
}) {
  const { examName, year } = await params;

  const pdfUrl = ""; // Placeholder for the PDF URL

  return (
    <div>
      {pdfUrl ? (
        <main className="container mx-auto px-6 py-12">
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
            {decodeURIComponent(examName)} - {year}
          </h2>
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src={pdfUrl}
              className="w-full h-full"
              style={{ height: "100vh" }}
            ></iframe>
          </div>
        </main>
      ) : (
        <ComingSoon />
      )}
    </div>
  );
}
