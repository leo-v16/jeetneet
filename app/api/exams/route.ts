import { NextResponse } from 'next/server';
import prisma from '@/db/prisma';

export async function GET() {
  const exams = await prisma.exam.findMany();
  return NextResponse.json(exams);
}

export async function POST(request: Request) {
  const data = await request.json();
  const exam = await prisma.exam.create({
    data,
  });
  return NextResponse.json(exam, { status: 201 });
}
