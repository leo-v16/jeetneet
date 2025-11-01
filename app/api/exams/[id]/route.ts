import { NextResponse } from 'next/server'
import prisma from '@/db/prisma'

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params
  const data = await request.json()

  const exam = await prisma.exam.update({
    where: { id: parseInt(id, 10) },
    data,
  })

  return NextResponse.json(exam)
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params
  const parsedId = parseInt(id, 10)

  if (isNaN(parsedId)) {
    return new Response(JSON.stringify({ error: 'Invalid ID' }), { status: 400 })
  }

  await prisma.exam.delete({
    where: { id: parsedId },
  })

  return new Response(null, { status: 204 })
}
