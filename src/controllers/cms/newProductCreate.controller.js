const { findUserByRole } = require('../../models/User.model');
const { createNewProduct, findProductBySlug } = require('../../models/Product.model');
const { createCategoriesOnProduct } = require('../../models/CategoriesOnProducts.model');
const { createImageOfProduct } = require('../../models/ImageOfProduct.model');

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
  // let data = JSON.parse(JSON.stringify(req.body));

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
    sale_by: data.saleBy,
    sale_off_by_percent: Number(data.percentSale),
    sale_off_by_price: Number(data.priceSale),
    sale_off_desc: data.saleDesc,
    label: data.label,
    user_id
  };

  const resFindProductBySlug = await findProductBySlug(dataProduct.slug);
  console.log(resFindProductBySlug.payload.length)

  if (resFindProductBySlug.payload.length == 1) {
    res.send({
      errCode: 1,
      message: `Product's slug has already exits.`
    });
  } else {
    const resCreateNewProduct = await createNewProduct(dataProduct);

    if (resCreateNewProduct.status) {
      const product_id = resCreateNewProduct.payload.id;
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
        message: 'Create post successfully'
      });
    } else {
      res.send({
        errCode: 1,
        message: 'Something was wrong.'
      });
    }
  }
}

exports.action = action;

