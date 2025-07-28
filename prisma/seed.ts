import { PrismaClient } from '@prisma/client';
import devices from './devices.json' assert { type: 'json' };

const prisma = new PrismaClient();

async function main() {
  for (const device of devices as any[]) {
    await prisma.device.upsert({
      where: { brand: device.brand },
      update: {},
      create: device,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
