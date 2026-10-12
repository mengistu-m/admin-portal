const fs = require('fs');
const path = require('path');

const models = [
  { name: 'projects', dbName: 'project' },
  { name: 'services', dbName: 'service' },
  { name: 'careers', dbName: 'job' },
  { name: 'team', dbName: 'teamMember' },
  { name: 'testimonials', dbName: 'testimonial' },
  { name: 'blog', dbName: 'blogPost' }
];

models.forEach(model => {
  const dir = path.join('src/app/api', model.name);
  fs.mkdirSync(dir, { recursive: true });
  
  const content = `import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const data = await prisma.${model.dbName}.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
`;

  fs.writeFileSync(path.join(dir, 'route.ts'), content);
});

fs.mkdirSync('src/app/api/leads', { recursive: true });
const leadsContent = `import { NextResponse } from 'next/server';
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
`;
fs.writeFileSync('src/app/api/leads/route.ts', leadsContent);
