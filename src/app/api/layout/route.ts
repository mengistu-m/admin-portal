import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const setting = await prisma.setting.findUnique({ where: { id: 'home-layout' } });
    return NextResponse.json({ layout: setting ? JSON.parse(setting.value) : [] });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

