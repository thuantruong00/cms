const { updateProductById, findProductById, findProductBySlug } = require('../../models/Product.model');
const { findUserByRole } = require('../../models/User.model');
const { createCategoriesOnProduct, deleteCategoriesOnProducts } = require('../../models/CategoriesOnProducts.model');
const { deleteImageOfProduct, createImageOfProduct } = require('../../models/ImageOfProduct.model');

function convertToObject(obj) {
  const result = {};

  for (const key in obj) {
    const parts = key.split(/\]\[|\[|\]/).filter(Boolean);
    let currentObj = result;

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      if (!currentObj[part]) {
        if (i === parts.length - 1) {
          currentObj[part] = obj[key];
        } else {
          currentObj[part] = Array.isArray(obj[key]) ? [] : {};
        }
      }
      currentObj = currentObj[part];
    }
  }

  return result;
}

async function action(req, res) {
  const product_id = req.params.id;
  const user = await findUserByRole('root');
  const user_id = user.id;

  // console.log(req.body);

  const data = convertToObject(req.body);

  let dataProduct = {
    name: data.name,
    slug: data.slug,
    description: data.description,
    detail: data.detail,
    price: Number(data.price),
    is_show_price: data.isShow === 'true' ? true : false,
    stock_status: data.statusStock,
    stock_quantity: Number(data.quantity),
    order: Number(data.order),
    status: data.isActive === 'true' ? 'active' : 'inactive',
    unit: data.unit,
    is_sale_off: data.isSale === 'true' ? true : false,
    sale_off_by_percent: Number(data.percentSale),
    sale_off_desc: data.saleDesc,
    label: data.label,
    user_id
  };

  const resFindProductById = await findProductById(product_id);
  if (resFindProductById.payload == null) {
    res.send({
      errCode: 1,
      message: 'Cant not find product to update.'
    });
  }

  const slug = resFindProductById.payload.slug;

  const resFindProductBySlug = await findProductBySlug(data.slug);
  console.log(resFindProductBySlug.payload)

  if (resFindProductBySlug.payload.length == 1 && slug !== data.slug) {
    res.send({
      errCode: 1,
      message: `Product's slug already exists.`
    });
  } else {
    const resUpdateProductById = await updateProductById(product_id, dataProduct);
    const resDeleteCategoriesOnProducts = await deleteCategoriesOnProducts(product_id);
    const resDeleteImageOfProduct = await deleteImageOfProduct(product_id);

    if (resUpdateProductById.status) {
      let { arrayCategory, arrayImage } = data.array;

      for (const item of arrayCategory) {
        const resCreateCategoriesOfProducts = await createCategoriesOnProduct({
          product_id,
          product_category_id: Number(item)
        });
      }

      for (const item of arrayImage) {
        if (item != '') {
          const resCreateImageOfProduct = await createImageOfProduct({
            product_id,
            order: 0,
            product_id,
            href_image: item
          });
        }
      }
      res.send({
        errCode: 0,
        message: 'Update product successfully.'
      });
    } else {
      res.send({
        errCode: 1,
        message: 'Update product error.'
      });
    }
  }
}

exports.action = action;

