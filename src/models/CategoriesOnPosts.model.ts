import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default interface CategoriesOnPosts {
  post_id: number;
  post_category_id: number;
}

const createCategoriesOnPosts = async (post_id: number, post_category_id: number): Promise<object> => {
  try {
    const payload = await prisma.categories_on_posts.create({
      data: { post_id, post_category_id }
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

const findAllCategoriesOnPosts = async (): Promise<object> => {
  try {
    const payload = await prisma.categories_on_posts.findMany({
      include: {
        post: {
          select: {
            title: true,
            slug: true
          }
        },
        post_category: {
          select: {
            name: true
          }
        }
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

const findCategoriesOnPostsById = async (post_id: number, post_category_id: number): Promise<object> => {
  try {
    const payload = await prisma.categories_on_posts.findFirst({
      where: {
        post_id,
        post_category_id
      },
      include: {
        post: {
          select: {
            title: true,
            slug: true
          }
        },
        post_category: {
          select: {
            name: true
          }
        }
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

const updateCategoriesOnPostsById = async (post_id: number, post_category_id: number): Promise<object> => {
  try {
    const payload = await prisma.categories_on_posts.updateMany({
      where: {
        post_id
      },
      data: {
        post_category_id
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

const deleteCategoriesOnPosts = async (post_id: number, post_category_id: number): Promise<object> => {
  try {
    const payload = await prisma.categories_on_posts.deleteMany({
      where: {
        post_id,
        post_category_id
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

module.exports = {
  createCategoriesOnPosts,
  findAllCategoriesOnPosts,
  findCategoriesOnPostsById,
  updateCategoriesOnPostsById,
  deleteCategoriesOnPosts
};

