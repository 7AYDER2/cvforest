import { Gender, type PrismaClient } from '@db/gen/prisma/client';
import {
  genFullName,
  logSeedTable,
  runInBatches,
} from '@db/seed/utils/helpers';
import { dunna } from 'dunna';

export async function seedUsers(prisma: PrismaClient) {
  logSeedTable('users');

  const governorates = await prisma.governorate.findMany();

  const files = await prisma.file.findMany({
    where: { key: { startsWith: 'avatar-' } },
  });

  const promises = [];
  for (let i = 0; i < 10_000; i++) {
    const promise = prisma.user.create({
      data: {
        name: genFullName(Gender.Male),
        email: `user${i}@example.com`,
        avatarId: dunna.basic.choice(files).id,
        gender: dunna.basic.choice(Object.values(Gender)),
        governorateId: dunna.basic.choice(governorates).id,
      },
    });

    promises.push(promise);
  }

  await runInBatches(promises);
}
