import { PrismaClient } from '@prisma/client';
const client = new PrismaClient();

export default interface Page {
  id: number;
  name: string;
  title: string;
  type: string;
  slug: string;
  description: string;
  status: string;
  created_at: Date;
  updated_at: Date;
  user_id: string;
}

const createInitPage = async (dataInit: any, id: string): Promise<Page[] | null> => {
  try {
    const createdRecords: Page[] = [];

    for (const item of dataInit) {
      // Use create to insert individual records into the database
      const createdRecord = await client.page.create({
        data: { ...item, user_id: id }
      });

      createdRecords.push(createdRecord);
    }

    return createdRecords;
  } catch (error) {
    return null;
  }
};

const findPageByType = async (type: any): Promise<Page[] | null> => {
  try {
    return await client.page.findMany({
      where: {
        type
      }
    });
  } catch (e) {
    console.log(e);
    return null;
  }
};

const getAllPages = async (): Promise<Page[] | null> => {
  try {
    return await client.page.findMany();
  } catch (error) {
    return null;
  }
};

module.exports = { createInitPage, getAllPages, findPageByType };

