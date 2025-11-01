import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const exams = [
  { name: 'JEE Main', description: 'Joint Entrance Examination for Engineering', popularity: 9 },
  { name: 'NEET UG', description: 'National Eligibility cum Entrance Test for Medical', popularity: 10 },
  { name: 'CBSE', description: 'Central Board of Secondary Education', popularity: 8 },
  { name: 'ICSE', description: 'Indian Certificate of Secondary Education', popularity: 7 },
  { name: 'CUET', description: 'Common University Entrance Test', popularity: 6 },
];

const options = [
  { name: "PYQ", description: "Previous Year Questions", href: "pyq" },
  { name: "Notes", description: "Chapter-wise notes", href: "../../coming-soon" },
  { name: "Mindmaps", description: "Visual learning aids", href: "../../coming-soon" },
  { name: "Syllabus", description: "Detailed syllabus", href: "../../coming-soon" },
  { name: "Mock Tests", description: "Practice tests", href: "../../coming-soon" },
];

async function main() {
  await prisma.examYear.deleteMany({});
  await prisma.examOption.deleteMany({});
  await prisma.exam.deleteMany({});
  for (const exam of exams) {
    await prisma.exam.create({
      data: {
        ...exam,
        options: {
          create: options,
        },
        years: {
          create: [
            { year: 2023 },
            { year: 2022 },
            { year: 2021 },
          ],
        },
      },
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
