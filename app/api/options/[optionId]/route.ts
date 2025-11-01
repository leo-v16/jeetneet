import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/db/prisma';

// @ts-ignore - Next.js 16 params type mismatch
export async function PUT(request: NextRequest, { params }: { params: Promise<{ optionId: string }> }) {
  const { optionId } = await params;
  const data = await request.json();

  const option = await prisma.examOption.update({
    where: { id: parseInt(optionId, 10) },
    data,
  });

  return NextResponse.json(option);
}

// @ts-ignore - Next.js 16 params type mismatch
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ optionId: string }> }) {
  const { optionId } = await params;

  await prisma.examOption.delete({
    where: { id: parseInt(optionId, 10) },
  });

  return new Response(null, { status: 204 });
}
