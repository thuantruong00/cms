import { PrismaClient } from '@prisma/client';

import users from './users.fake.json';

const prisma = new PrismaClient();

async function main() {
  for (let user of users) {
    let { id, password_hash, ...rest } = user;
    await prisma.user.create({
      data: {
        ...rest
      }
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
