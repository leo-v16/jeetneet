import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const exams = [
  { name: 'JEE Main', description: 'Joint Entrance Examination for Engineering', popularity: 9 },
  { name: 'NEET UG', description: 'National Eligibility cum Entrance Test for Medical', popularity: 10 },
  { name: 'CBSE', description: 'Central Board of Secondary Education', popularity: 8 },
  { name: 'ICSE', description: 'Indian Certificate of Secondary Education', popularity: 7 },
  { name: 'CUET', description: 'Common University Entrance Test', popularity: 6 },
];

async function main() {
  for (const exam of exams) {
    await prisma.exam.create({
      data: exam,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
