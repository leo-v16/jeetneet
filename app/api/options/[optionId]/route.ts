import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/db/prisma';

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ optionId: string }> }
) {
  const { optionId } = await context.params;
  const data = await request.json();

  const option = await prisma.examOption.update({
    where: { id: parseInt(optionId, 10) },
    data,
  });

  return NextResponse.json(option);
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ optionId: string }> }
) {
  const { optionId } = await context.params;

  await prisma.examOption.delete({
    where: { id: parseInt(optionId, 10) },
  });

  return new Response(null, { status: 204 });
}
