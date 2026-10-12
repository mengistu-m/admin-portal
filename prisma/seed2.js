const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.service.createMany({
    data: [
      { name: "Architectural Design", description: "Full-service architectural planning and design.", status: "Published" },
      { name: "Civil Works", description: "Heavy construction and civil engineering projects.", status: "Published" },
    ]
  });

  await prisma.teamMember.createMany({
    data: [
      { name: "Alice Johnson", role: "Lead Architect", bio: "20 years of experience." },
      { name: "Bob Smith", role: "Civil Engineer", bio: "Specializes in large scale projects." },
    ]
  });

  await prisma.blogPost.createMany({
    data: [
      { title: "Future of Construction", content: "AI is changing everything...", category: "Industry Trends", status: "Published" },
      { title: "Sustainable Building Materials", content: "Green concrete is the future.", category: "Sustainability", status: "Draft" },
    ]
  });

  await prisma.testimonial.createMany({
    data: [
      { clientName: "John Doe", company: "Acme Corp", quote: "Great work!", rating: 5, status: "Approved" },
      { clientName: "Jane Smith", company: "Smith Properties", quote: "Very professional.", rating: 4, status: "Pending" },
    ]
  });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
