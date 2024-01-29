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

const createInitPage = async (dataInit: any, id: string): Promise<object> => {
  try {
    const payload: Page[] = [];

    for (const item of dataInit) {
      // Use create to insert individual records into the database
      const createdRecord = await client.page.create({
        data: { ...item, user_id: id }
      });

      payload.push(createdRecord);
    }

    return {
      status: true,
      message: 'Success create page',
      payload
    };
  } catch (e) {
    console.log(e);
    return {
      status: false,
      message: 'Failed create page',
      payload: null
    };
  }
};

const getAllPageByType = async (type: any): Promise<object> => {
  try {
    const payload = await client.page.findMany({
      where: {
        type
      }
    });
    return {
      status: true,
      message: 'Success get page by type',
      payload
    };
  } catch (e) {
    console.log(e);
    return {
      status: false,
      message: 'Failed get page by type',
      payload: null
    };
  }
};

const getAllPages = async (): Promise<object> => {
  try {
    const payload = await client.page.findMany();
    return {
      status: true,
      message: 'Success get all page ',
      payload
    };
  } catch (e) {
    console.log(e);
    return {
      status: false,
      message: 'Failed get all page',
      payload: null
    };
  }
};

module.exports = { createInitPage, getAllPages, getAllPageByType };

