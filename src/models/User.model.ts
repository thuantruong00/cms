import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';
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

const hashPassword = (plain_text: string) => {
  // creating a unique salt for a particular user
  const salt = crypto.randomBytes(16).toString('hex');

  // hashing user's salt and password
  const hash = crypto.pbkdf2Sync(plain_text, salt, 1000, 64, 'sha512').toString('hex');

  return [hash, salt];
};

const createUser = async (username: string, password: string, email: string): Promise<User | null> => {
  const [passwordHash, salt] = hashPassword(password);
  try {
    return await client.user.create({
      data: {
        username: username.trim(),
        password_hash: passwordHash,
        salt: salt,
        email
      }
    });
  } catch (error) {
    return null;
  }
};

const createUserRoot = async (): Promise<User | null> => {
  const [passwordHash, salt] = hashPassword('123123');
  try {
    return await client.user.create({
      data: {
        username: 'root',
        password_hash: passwordHash,
        salt: salt,
        email: '',
        type: 'root',
        fullname: 'rootuser'
      }
    });
  } catch (error) {
    return null;
  }
};

const findUserById = async (id: string): Promise<User | null> => {
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

const findUserByUsername = async (username: string): Promise<User | null> => {
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

const findUserByIdandUpdate = async (userId: string, dataModified: any): Promise<User | null> => {
  try {
    return await client.user.update({
      where: {
        id: userId
      },
      data: {}
    });
  } catch (error) {
    console.error(error);
    return null;
  }
};

const findUserByRole = async (type: string): Promise<User | null> => {
  try {
    return await client.user.findFirst({
      where: {
        type
      }
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getAllUsers = async (): Promise<User[] | null> => {
  try {
    return await client.user.findMany();
  } catch (error) {
    console.log({ error });
    return null;
  }
};

module.exports = { findUserById, findUserByUsername, findUserByRole, getAllUsers, createUser, createUserRoot };

