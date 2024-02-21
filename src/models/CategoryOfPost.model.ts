import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default interface CategoryOfPost {
  id: number;
  name: string;
  slug: string;
  description: string;
  created_at: Date;
  updated_at: Date;
  user_id: string;
}

const createCategory = async (data: CategoryOfPost): Promise<object> => {
  try {
    const payload = await prisma.category_of_post.create({ data });
    return {
      status: true,
      message: 'Success create category of post',
      payload
    };
  } catch (e) {
    console.log(e);
    return {
      status: false,
      message: 'Failed create category of post',
      payload: null
    };
  }
};

const findAllCategory = async (): Promise<object> => {
  try {
    const payload = await prisma.category_of_post.findMany({
      where: {
        name: {
          not: 'Other'
        }
      }
    });

    return {
      status: true,
      message: 'Success get all category of post',
      payload
    };
  } catch (e) {
    return {
      status: false,
      message: 'Failed get all category of post',
      payload: null
    };
  }
};

const deleteById = async (id: number): Promise<object> => {
  try {
    const payload = await prisma.category_of_post.delete({
      where: { id }
    });
    return {
      status: true,
      message: 'Success delete category of post',
      payload
    };
  } catch (e) {
    console.log(e);
    return {
      status: false,
      message: 'Failed delete category of post',
      payload: null
    };
  }
};

const updateCategoryById = async (id: number, data: CategoryOfPost): Promise<object> => {
  try {
    const payload = await prisma.category_of_post.update({
      where: { id },
      data
    });
    return {
      status: true,
      message: 'Success update category of post',
      payload
    };
  } catch (e) {
    console.log(e);
    return {
      status: false,
      message: 'Failed update category of post',
      payload: null
    };
  }
};

module.exports = { createCategory, findAllCategory, deleteById, updateCategoryById };

