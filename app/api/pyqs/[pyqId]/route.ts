import { NextResponse } from 'next/server';
import prisma from '@/db/prisma';

export async function PUT(request: Request, context: { params: Promise<{ pyqId: string }> }) {
  const { pyqId } = await context.params;
  const parsedPyqId = parseInt(pyqId, 10);

  if (isNaN(parsedPyqId)) {
    console.error('PUT failed: Invalid ID in params:', pyqId);
    return new Response(JSON.stringify({ error: 'Invalid ID' }), { status: 400 });
  }

  const data = await request.json();
  const pyq = await prisma.pYQ.update({
    where: { id: parsedPyqId },
    data,
  });
  return NextResponse.json(pyq);
}

export async function DELETE(request: Request, context: { params: Promise<{ pyqId: string }> }) {
  const { pyqId } = await context.params;
  const parsedPyqId = parseInt(pyqId, 10);

  if (isNaN(parsedPyqId)) {
    console.error('DELETE failed: Invalid ID in params:', pyqId);
    return new Response(JSON.stringify({ error: 'Invalid ID' }), { status: 400 });
  }

  await prisma.pYQ.delete({
    where: { id: parsedPyqId },
  });
  return new Response(null, { status: 204 });
}
