import { NextResponse } from 'next/server';
import prisma from '@/db/prisma';

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const parsedId = parseInt(id, 10);

  if (isNaN(parsedId)) {
    console.error('GET failed: Invalid ID in params:', id);
    return new Response(JSON.stringify({ error: 'Invalid ID' }), { status: 400 });
  }

  const years = await prisma.examYear.findMany({
    where: { examId: parsedId },
  });
  return NextResponse.json(years);
}

export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const parsedId = parseInt(id, 10);

  if (isNaN(parsedId)) {
    console.error('POST failed: Invalid ID in params:', id);
    return new Response(JSON.stringify({ error: 'Invalid ID' }), { status: 400 });
  }

  const data = await request.json();
  const year = await prisma.examYear.create({
    data: {
      ...data,
      examId: parsedId,
    },
  });
  return NextResponse.json(year, { status: 201 });
}
