import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = await prisma.lead.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        company: body.company,
        service: body.service,
        status: 'New',
      }
    });
    return NextResponse.json({ success: true, lead: data }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create lead' }, { status: 500 });
  }
}
