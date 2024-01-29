import { PrismaClient } from '@prisma/client';
const client = new PrismaClient();

export default interface SectionOfPage {
  id: number;
  name: string;
  value: string;
  type: string;
  class: string;
  display: boolean;
  attr_href: string;
  attr_target: string | null;
  updated_at: Date;
  expiration_date: Date | null;
  page_id: number;
}

const createInitSectionOfPage = async (dataInit: any): Promise<object | null> => {
  try {
    const payload: SectionOfPage[] = [];
    for (const item of dataInit) {
      const createdRecord = await client.section_of_page.create({
        data: item
      });

      payload.push(createdRecord);
    }
    return {
      status: true,
      message: 'Get create page',
      payload
    };
  } catch (e) {
    return {
      status: false,
      message: 'Failed to get create page',
      payload: null
    };
  }
};

const findAllSectionOfPagesByPageId = async (page_id: number): Promise<object | null> => {
  try {
    const payload = await client.section_of_page.findMany({
      where: {
        page_id
      }
    });
    return {
      status: true,
      message: 'Get section of page by id',
      payload
    };
  } catch (e) {
    return {
      status: false,
      message: 'Failed to get section of page by id',
      payload: null
    };
  }
};

const updateSectionOfPage = async (data: SectionOfPage[]): Promise<object> => {
  try {
    const payload = [];
    for (const item of data) {
      const updateItem = await client.section_of_page.update({
        where: {
          id: item.id
        },
        data: item
      });
      if (updateItem) {
        payload.push(updateItem);
      }
    }
    return {
      status: true,
      message: 'Update section of page by id',
      payload
    };
  } catch (e) {
    console.log(e);
    return {
      status: false,
      message: 'Failed update section of page by id',
      payload: true
    };
  }
};

const getAllSectionOfPages = async (): Promise<object> => {
  try {
    const payload = await client.section_of_page.findMany();
    return {
      status: true,
      message: 'Update section of page by id',
      payload
    };
  } catch (e) {
    console.log(e);
    return {
      status: false,
      message: 'Failed update section of page by id',
      payload: true
    };
  }
};

module.exports = {
  createInitSectionOfPage,
  findAllSectionOfPagesByPageId,
  updateSectionOfPage,
  getAllSectionOfPages
};

