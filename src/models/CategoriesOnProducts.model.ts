import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default interface CategoriesOnProducts {
  product_id: string;
  product_category_id: number;
}

const createCategoriesOnProduct = async (data: CategoriesOnProducts): Promise<object> => {
  try {
    const payload = await prisma.categories_on_products.create({
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

const getCategoryById = async (product_id: string): Promise<object> => {
  try {
    const data = await prisma.categories_on_products.findMany({
      where: {
        product_id
      },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            slug: true,
            price: true,
            status: true,
            stock_quantity: true,
            unit: true,
            stock_status: true
          }
        },
        product_category: {
          select: {
            name: true
          }
        }
      }
    });
    var arrayCategory = [];
    for (const item of data) {
      arrayCategory.push(item.product_category.name);
    }
    var payload = { ...data[0].product, arrayCategory };

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

const deleteCategoriesOnProducts = async (product_id: string): Promise<object> => {
  try {
    const payload = await prisma.categories_on_products.deleteMany({
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

module.exports = { createCategoriesOnProduct, getCategoryById,deleteCategoriesOnProducts };

