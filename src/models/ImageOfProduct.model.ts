import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default interface ImageOfProduct {
  id: number;
  order: number;
  product_id: string;
  href_image: string;
}

const createImageOfProduct = async (data: ImageOfProduct): Promise<object> => {
  try {
    const payload = await prisma.image_of_product.create({
      data
    });
    return {
      status: true,
      message: 'Success create categories on posts',
      payload
    };
  } catch (e) {
    return {
      status: false,
      message: 'Failed create categories on posts',
      payload: null
    };
  }
};

const findImageOfProductById = async (product_id: string): Promise<object> => {
  try {
    const res = await prisma.image_of_product.findMany({
      where: {
        product_id
      },
      include: {}
    });
    var payload = [];
    for (const item of res) {
      payload.push(item.href_image)
    }
    return {
      status: true,
      message: 'Success create categories on posts',
      payload
    };
  } catch (e) {
    return {
      status: false,
      message: 'Failed create categories on posts',
      payload: null
    };
  }
};

const deleteImageOfProduct = async (product_id: string): Promise<object> => {
  try {
    const payload = await prisma.image_of_product.deleteMany({
      where: {
        product_id
      }
    });
    return {
      status: true,
      message: 'Success create categories on posts',
      payload
    };
  } catch (e) {
    return {
      status: false,
      message: 'Failed create categories on posts',
      payload: null
    };
  }
};

module.exports = { createImageOfProduct, findImageOfProductById, deleteImageOfProduct };

