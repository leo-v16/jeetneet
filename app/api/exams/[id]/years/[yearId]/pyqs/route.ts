import { NextResponse } from 'next/server';
import prisma from '@/db/prisma';
import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export async function GET(request: Request, context: { params: Promise<{ id: string, yearId: string }> }) {
  const { id, yearId } = await context.params;
  const parsedExamId = parseInt(id, 10);
  const parsedYearId = parseInt(yearId, 10);

  if (isNaN(parsedExamId) || isNaN(parsedYearId)) {
    console.error('GET failed: Invalid ID in params:', id, yearId);
    return new Response(JSON.stringify({ error: 'Invalid ID' }), { status: 400 });
  }

  const pyqs = await prisma.pYQ.findMany({
    where: { examId: parsedExamId, yearId: parsedYearId },
  });
  return NextResponse.json(pyqs);
}

export async function POST(request: Request, context: { params: Promise<{ id: string, yearId: string }> }) {
  const { id, yearId } = await context.params;
  const parsedExamId = parseInt(id, 10);
  const parsedYearId = parseInt(yearId, 10);

  if (isNaN(parsedExamId) || isNaN(parsedYearId)) {
    console.error('POST failed: Invalid ID in params:', id, yearId);
    return new Response(JSON.stringify({ error: 'Invalid ID' }), { status: 400 });
  }

  const data = await request.json();
  const pyq = await prisma.pYQ.create({
    data: {
      ...data,
      examId: parsedExamId,
      yearId: parsedYearId,
    },
  });
  return NextResponse.json(pyq, { status: 201 });
}
