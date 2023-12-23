import { PrismaClient } from '@prisma/client';

const client = new PrismaClient();

const user = {
  getUserByUsername: async (username: string) => {
    const result = await client.user.findUniqueOrThrow({
      where: {
        username
      }
    });
  }
};

export default user;
