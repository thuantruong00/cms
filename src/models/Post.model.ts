import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default interface Post {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  status: string;
  created_at: Date;
  updated_at: Date;
  user_id: string;
  image_id: number;
}

const createNewPost = async (data: Post): Promise<object> => {
  try {
    const payload = await prisma.post.create({
      data
    });
    return {
      status: true,
      message: 'Success create new post',
      payload
    };
  } catch (e) {
    console.log(e);
    return {
      status: false,
      message: 'Failed create new post',
      payload: null
    };
  }
};

const findAllPost = async (): Promise<object> => {
  try {
    const payload = await prisma.post.findMany({});
    return {
      status: true,
      message: 'Success find all post',
      payload
    };
  } catch (e) {
    console.log(e);
    return {
      status: false,
      message: 'Failed find all post',
      payload: null
    };
  }
};

const findPostBySlug = async (slug: string): Promise<object> => {
  try {
    const payload = await prisma.post.findFirst({
      where: {
        slug
      }
    });
    return {
      status: true,
      message: 'Success find all post',
      payload
    };
  } catch (e) {
    console.log(e);
    return {
      status: false,
      message: 'Failed find all post',
      payload: null
    };
  }
};

const findPostById = async (id: number): Promise<object> => {
  try {
    const payload = await prisma.post.findFirst({
      where: {
        id
      },
      include: {
        image: {
          select: {
            url: true
          }
        }
      }
    });

    return {
      status: true,
      message: 'Success find all post',
      payload
    };
  } catch (e) {
    console.log(e);
    return {
      status: false,
      message: 'Failed find all post',
      payload: null
    };
  }
};

const deleteById = async (id: number): Promise<object> => {
  try {
    const payload = await prisma.post.delete({
      where: {
        id
      }
    });

    return {
      status: true,
      message: 'Success delete post',
      payload
    };
  } catch (e) {
    console.log(e);
    return {
      status: false,
      message: 'Failed delete post',
      payload: null
    };
  }
};

const updatePostById = async (id: number, data: Post): Promise<object> => {
  try {
    const payload = await prisma.post.update({
      where: {
        id
      },
      data
    });

    return {
      status: true,
      message: 'Success update post',
      payload
    };
  } catch (e) {
    console.log(e);
    return {
      status: false,
      message: 'Failed update post',
      payload: null
    };
  }
};

module.exports = { createNewPost, findAllPost, findPostBySlug, findPostById, deleteById, updatePostById };

