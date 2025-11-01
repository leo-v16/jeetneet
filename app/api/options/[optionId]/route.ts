import { NextResponse } from 'next/server';
import prisma from '@/db/prisma';

export async function PUT(request: Request, { params }: { params: { optionId: string } }) {
  const data = await request.json();
  const option = await prisma.examOption.update({
    where: { id: parseInt(params.optionId, 10) },
    data,
  });
  return NextResponse.json(option);
}

export async function DELETE(request: Request, { params }: { params: { optionId: string } }) {
  await prisma.examOption.delete({
    where: { id: parseInt(params.optionId, 10) },
  });
  return new Response(null, { status: 204 });
}
