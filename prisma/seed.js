const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.lead.createMany({
    data: [
      { name: "John Smith", company: "Smith Properties", email: "john@example.com", phone: "+1 555-0100", service: "Architectural Design", status: "New" },
      { name: "Sarah Jenkins", company: "Jenkins Logistics", email: "sarah.j@example.com", phone: "+1 555-0101", service: "Civil Works", status: "Contacted" },
      { name: "Mike Chen", company: "Chen Group", email: "m.chen@example.com", phone: "+1 555-0102", service: "Electrical", status: "In Progress" },
      { name: "Amanda Cole", company: "Cole & Co", email: "acole@example.com", phone: "+1 555-0103", service: "Sanitation", status: "Won" },
    ]
  });

  await prisma.project.createMany({
    data: [
      { title: "Downtown Commercial Tower", clientName: "Acme Corp", category: "Architectural Design", status: "Ongoing", date: "Oct 2026", description: "A towering success." },
      { title: "Riverside Residential Complex", clientName: "Private", category: "Civil Works", status: "Completed", date: "Aug 2026", description: "Beautiful living." },
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
