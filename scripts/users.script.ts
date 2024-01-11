import { PrismaClient } from '@prisma/client';

import crypto from 'crypto';
import users from './users.fake.json';

const prisma = new PrismaClient();

const hashPassword = (plain_text: string): string[] => {
  // creating a unique salt for a particular user
  const salt = crypto.randomBytes(16).toString('hex');

  // hashing user's salt and password
  const hash = crypto.pbkdf2Sync(plain_text, salt, 1000, 64, 'sha512').toString('hex');

  return [hash, salt];
};

async function main() {
  for (let user of users) {
    let { id, password_hash, ...rest } = user;

    const [hashing_pwd, salt] = hashPassword(password_hash);
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
