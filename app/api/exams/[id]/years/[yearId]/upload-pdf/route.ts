import { NextResponse } from 'next/server';
import prisma from '@/db/prisma';

export async function POST(request: Request, context: { params: Promise<{ id: string, yearId: string }> }) {
  const { id, yearId } = await context.params;
  const parsedExamId = parseInt(id, 10);
  const parsedYearId = parseInt(yearId, 10);

  if (isNaN(parsedExamId) || isNaN(parsedYearId)) {
    console.error('POST failed: Invalid ID in params:', id, yearId);
    return new Response(JSON.stringify({ error: 'Invalid ID' }), { status: 400 });
  }

  const formData = await request.formData();
  const pdfUrl = formData.get('pdfUrl') as string;

  if (!pdfUrl) {
    return new Response(JSON.stringify({ error: 'No PDF URL provided.' }), { status: 400 });
  }

  // Update the pdfUrl for the existing ExamYear record
  const updatedExamYear = await prisma.examYear.update({
    where: {
      id: parsedYearId,
    },
    data: {
      pdfUrl: pdfUrl,
    },
  });

  return NextResponse.json(updatedExamYear, { status: 200 });
}
