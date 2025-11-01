import { NextResponse } from 'next/server';
import prisma from '@/db/prisma';
import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: Request, context: { params: Promise<{ id: string, yearId: string }> }) {
  const { id, yearId } = await context.params;
  const parsedExamId = parseInt(id, 10);
  const parsedYearId = parseInt(yearId, 10);

  if (isNaN(parsedExamId) || isNaN(parsedYearId)) {
    console.error('POST failed: Invalid ID in params:', id, yearId);
    return new Response(JSON.stringify({ error: 'Invalid ID' }), { status: 400 });
  }

  const formData = await request.formData();
  const file = formData.get('pdfFile') as File;

  if (!file) {
    return new Response(JSON.stringify({ error: 'No PDF file uploaded.' }), { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = `${uuidv4()}-${file.name}`;
  const filePath = path.join(process.cwd(), 'public', 'uploads', filename);

  await fs.writeFile(filePath, buffer);

  // Update the pdfFilePath for the existing ExamYear record
  const updatedExamYear = await prisma.examYear.update({
    where: {
      id: parsedYearId,
    },
    data: {
      pdfFilePath: `/uploads/${filename}`,
    },
  });

  return NextResponse.json(updatedExamYear, { status: 200 });
}
