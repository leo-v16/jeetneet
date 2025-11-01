import { NextResponse } from 'next/server';
import prisma from '@/db/prisma';

export async function PUT(request: Request, context: { params: { optionId: string } }) {
  const { optionId } = context.params;
  const data = await request.json();
  const option = await prisma.examOption.update({
    where: { id: parseInt(optionId, 10) },
    data,
  });
  return NextResponse.json(option);
}

export async function DELETE(request: Request, context: { params: { optionId: string } }) {
  const { optionId } = context.params;
  await prisma.examOption.delete({
    where: { id: parseInt(optionId, 10) },
  });
  return new Response(null, { status: 204 });
}
