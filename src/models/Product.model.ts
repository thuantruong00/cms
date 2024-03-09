import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  detail: string;
  price: number;
  is_show_price: boolean;
  stock_status: string;
  stock_quantity: number;
  order: number;
  status: string;
  unit: string;
  is_sale_off: boolean;
  sale_by: string;
  sale_off_by_price: number;
  sale_off_by_percent: number;
  sale_off_desc: string;
  label: string;
  user_id: string;
  created_at: Date;
  updated_at: Date;
}

const createNewProduct = async (data: Product): Promise<object> => {
  try {
    const payload = await prisma.product.create({
      data
    });
    return {
      status: true,
      message: 'Success create new product',
      payload
    };
  } catch (e) {
    console.log(e);
    return {
      status: false,
      message: 'Failed create new product',
      payload: null
    };
  }
};

const findProductBySlug = async (slug: string): Promise<object> => {
  try {
    const payload = await prisma.product.findMany({
      where: { slug },
    
    });

    return {
      status: true,
      message: 'Success find  product by slug',
      payload
    };
  } catch (e) {
    console.log(e);
    return {
      status: false,
      message: 'Failed create find product by slug',
      payload: null
    };
  }
};

const findAllProduct = async (): Promise<object> => {
  try {
    const payload = await prisma.product.findMany({});

    return {
      status: true,
      message: 'Success find  product',
      payload
    };
  } catch (e) {
    console.log(e);
    return {
      status: false,
      message: 'Failed create find product',
      payload: null
    };
  }
};

const findProductById = async (id: string): Promise<object> => {
  try {
    const payload = await prisma.product.findFirst({
      where: {
        id
      }
    });

    return {
      status: true,
      message: 'Success find  product by id',
      payload
    };
  } catch (e) {
    console.log(e);
    return {
      status: false,
      message: 'Failed create find product by id',
      payload: null
    };
  }
};

const deleteProductById = async (id: string): Promise<object> => {
  try {
    const payload = await prisma.product.delete({
      where: {
        id
      }
    });
    return {
      status: true,
      message: 'Success delete product',
      payload
    };
  } catch (e) {
    console.log(e);
    return {
      status: false,
      message: 'Failed create delete product',
      payload: null
    };
  }
};

const updateProductById = async (id: string, data: Product): Promise<object> => {
  try {
    const payload = await prisma.product.update({
      where: {
        id
      },
      data
    });
    return {
      status: true,
      message: 'Success update product',
      payload
    };
  } catch (e) {
    console.log(e);
    return {
      status: false,
      message: 'Failed update product',
      payload: null
    };
  }
};

module.exports = {
  createNewProduct,
  findProductBySlug,
  findAllProduct,
  findProductById,
  deleteProductById,
  updateProductById
};

