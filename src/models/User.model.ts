import { PrismaClient } from '@prisma/client';

const client = new PrismaClient();

export default interface User {
  id: string;
  username: string;
  email: string;
  fullname: string;
  password_hash: string;
  salt: string | null;
  created_at: Date;
  updated_at: Date;
  last_login_time: Date;
  last_login_ip: string;
  status: string;
  type: string;
}

export const findUserById = async (id: string): Promise<User | null> => {
  try {
    return await client.user.findUnique({
      where: {
        id
      }
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const findUserByUsername = async (username: string): Promise<User | null> => {
  try {
    return await client.user.findUnique({
      where: {
        username
      }
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};
