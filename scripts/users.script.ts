import { PrismaClient } from '@prisma/client';

import users from './users.fake.json';
import { hashing } from '../src/utils';

const prisma = new PrismaClient();

async function main() {
  for (let user of users) {
    let { id, password_hash, ...rest } = user;

    const [hashing_pwd, salt] = hashing(password_hash);
    await prisma.user.create({
      data: {
        password_hash: hashing_pwd,
        salt,
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
