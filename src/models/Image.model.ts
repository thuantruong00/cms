import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default interface Image {
  id: number;
  file_name: string;
  title: string;
  url: string;
  size: number;
  type: string;
  resolution: string;
  created_at: Date;
  user_id: string;
  image_of_product_id: number | null;
}

const createImage = async (data: Image[]): Promise<object> => {
  try {
    let resArray: Image[] = [];

    for (const item of data) {
      const resData = await prisma.image.create({
        data: item
      });
      resArray.push(resData);
    }
    return {
      status: true,
      message: 'Success create image',
      payload: resArray
    };
  } catch (e) {
    console.log(e);
    return {
      status: false,
      message: 'Failed create image',
      payload: null
    };
  }
};

const getAllImage = async (): Promise<object | null> => {
  try {
    const payload: Image[] = await prisma.image.findMany();
    return {
      status: true,
      message: 'Success get image',
      payload
    };
  } catch (e) {
    return {
      status: false,
      message: 'Failed get image',
      payload: null
    };
  }
};

const getImageByType = async (type: string): Promise<object> => {
  try {
    const payload: Image[] = await prisma.image.findMany({
      where: {
        type
      }
    });
    return {
      status: true,
      message: 'Success get image',
      payload
    };
  } catch (e) {
    return {
      status: false,
      message: 'Failed get image by type',
      payload: null
    };
  }
};

const getImageByID = async (id: number): Promise<object> => {
  try {
    const payload = await prisma.image.findUnique({
      where: {
        id
      }
    });
    return {
      status: true,
      message: 'Success get image by id',
      payload
    };
  } catch (e) {
    return {
      status: false,
      message: 'Failed delete image',
      payload: null
    };
  }
};

const getImageByUrl = async (url: string): Promise<object> => {
  try {
    const payload = await prisma.image.findFirst({
      where: {
        url
      }
    });
    return {
      status: true,
      message: 'Success get image by id',
      payload
    };
  } catch (e) {
    return {
      status: false,
      message: 'Failed delete image',
      payload: null
    };
  }
};

const deleteImageMany = async (data: number[]): Promise<object> => {
  try {
    const payload = await prisma.image.deleteMany({
      where: {
        id: {
          in: data
        }
      }
    });

    return {
      status: true,
      message: 'Success delete image',
      payload: payload
    };
  } catch (e) {
    return {
      status: false,
      message: 'Failed delete image',
      payload: null
    };
  }
};

module.exports = { createImage, getAllImage, getImageByType, getImageByID, getImageByUrl, deleteImageMany };

