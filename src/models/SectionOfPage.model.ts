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

const createInitSectionOfPage = async (dataInit: any): Promise<SectionOfPage[] | null> => {
  try {
    const createdRecords: SectionOfPage[] = [];
    for (const item of dataInit) {
      const createdRecord = await client.section_of_page.create({
        data: item
      });

      createdRecords.push(createdRecord);
    }
    return createdRecords;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const findAllSectionOfPagesByPageId = async (page_id: number): Promise<SectionOfPage[] | null> => {
  try {
    return await client.section_of_page.findMany({
      where: {
        page_id
      }
    });
  } catch (e) {
    return null;
  }
};

const updateSectionOfPage = async (data: SectionOfPage): Promise<SectionOfPage | null> => {
  try {
    return await client.section_of_page.update({
      where: {
        id: Number(data.id),
      },
      data
    });
  } catch (e) {
    console.log(e);
    return null;
  }
};

const updateSectionOfBlock = async (data: SectionOfPage): Promise<SectionOfPage | null> => {
  try {
    return await client.section_of_page.update({
      where: {
        id: Number(data.id),
        type: 'block'
      },
      data
    });
  } catch (e) {
    console.log(e);
    return null;
  }
};

const getAllSectionOfPages = async (): Promise<SectionOfPage[] | null> => {
  try {
    return await client.section_of_page.findMany();
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports = { createInitSectionOfPage, getAllSectionOfPages, findAllSectionOfPagesByPageId, updateSectionOfPage,updateSectionOfBlock };

