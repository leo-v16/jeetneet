import { NextResponse } from 'next/server';
import prisma from '@/db/prisma';

export async function PUT(request: Request, context: { params: Promise<{ yearId: string }> }) {
  const { yearId } = await context.params;
  const parsedYearId = parseInt(yearId, 10);

  if (isNaN(parsedYearId)) {
    console.error('PUT failed: Invalid ID in params:', yearId);
    return new Response(JSON.stringify({ error: 'Invalid ID' }), { status: 400 });
  }

  const data = await request.json();
  const year = await prisma.examYear.update({
    where: { id: parsedYearId },
    data: { ...data, pdfUrl: data.pdfUrl || null },
  });
  return NextResponse.json(year);
}

export async function DELETE(request: Request, context: { params: Promise<{ yearId: string }> }) {
  const { yearId } = await context.params;
  const parsedYearId = parseInt(yearId, 10);

  if (isNaN(parsedYearId)) {
    console.error('DELETE failed: Invalid ID in params:', yearId);
    return new Response(JSON.stringify({ error: 'Invalid ID' }), { status: 400 });
  }

  await prisma.examYear.delete({
    where: { id: parsedYearId },
  });
  return new Response(null, { status: 204 });
}
