import { NextResponse } from 'next/server';
import prisma from '@/db/prisma';

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const options = await prisma.examOption.findMany({
    where: { examId: parseInt(id, 10) },
  });
  return NextResponse.json(options);
}

export async function POST(request: Request, context: { params: Promise<{id: string }>}) {
  const { id } = await context.params;
  const data = await request.json();
  const option = await prisma.examOption.create({
    data: {
      ...data,
      examId: parseInt(id, 10),
    },
  });
  return NextResponse.json(option, { status: 201 });
}
