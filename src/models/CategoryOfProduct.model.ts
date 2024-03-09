import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default interface CategoryOfProduct {
  id: number;
  name: string;
  slug: string;
  description: string;
  created_at: Date;
  updated_at: Date;
  user_id: string;
  parent_id: number | null;
}

const findAllCategoryOfProduct = async (notInclude: string): Promise<object> => {
  try {
    const payload = await prisma.category_of_product.findMany({
      where: {
        name: {
          not: notInclude
        }
      }
    });
    return {
      status: true,
      message: 'Success get all category of product',
      payload
    };
  } catch (e) {
    console.log(e);
    return {
      status: false,
      message: 'Failed get all category of product',
      payload: null
    };
  }
};

const findCategoryOfProductByParentId = async (parent_id: number): Promise<object> => {
  try {
    const payload = await prisma.category_of_product.findUnique({ where: { parent_id } });
    return {
      status: true,
      message: 'Success get all category of product',
      payload
    };
  } catch (e) {
    console.log(e);
    return {
      status: false,
      message: 'Failed get all category of product',
      payload: null
    };
  }
};

const findCategoryOfProductById = async (id: number): Promise<object> => {
  try {
    const payload = await prisma.category_of_product.findUnique({ where: { id } });
    return {
      status: true,
      message: 'Success get all category of product',
      payload
    };
  } catch (e) {
    console.log(e);
    return {
      status: false,
      message: 'Failed get all category of product',
      payload: null
    };
  }
};

const findCategoryOfProductBySlug = async (slug: string): Promise<object> => {
  try {
    const payload = await prisma.category_of_product.findFirst({ where: { slug } });
    return {
      status: true,
      message: 'Success get category of product by slug',
      payload
    };
  } catch (e) {
    console.log(e);
    return {
      status: false,
      message: 'Failed get category of product by slug',
      payload: null
    };
  }
};

const createCategoryOfProduct = async (data: CategoryOfProduct): Promise<object> => {
  try {
    const payload = await prisma.category_of_product.create({ data });
    return {
      status: true,
      message: 'Success create category of product',
      payload
    };
  } catch (e) {
    console.log(e);
    return {
      status: false,
      message: 'Failed create category of product',
      payload: null
    };
  }
};

const updateCategoryOfProduct = async (id: number, data: CategoryOfProduct): Promise<object> => {
  try {
    const payload = await prisma.category_of_product.update({
      where: {
        id
      },
      data
    });
    return {
      status: true,
      message: 'Success update category of product',
      payload
    };
  } catch (e) {
    console.log(e);
    return {
      status: false,
      message: 'Failed update category of product',
      payload: null
    };
  }
};

const deleteCategoryProductById = async (id: number): Promise<object> => {
  try {
    const payload = await prisma.category_of_product.delete({ where: { id } });
    return {
      status: true,
      message: 'Success delete category of product',
      payload
    };
  } catch (e) {
    console.log(e);
    return {
      status: false,
      message: 'Failed delete category of product',
      payload: null
    };
  }
};

module.exports = {
  findAllCategoryOfProduct,
  findCategoryOfProductById,
  findCategoryOfProductByParentId,
  findCategoryOfProductBySlug,
  createCategoryOfProduct,
  updateCategoryOfProduct,
  deleteCategoryProductById
};

