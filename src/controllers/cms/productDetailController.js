// _____ _____[]_____[]_____[ module ]_____[]_____[]_____ _____
const sidebarControl = require('../../services/cms/sidebarControl');
const { findProductById } = require('../../models/Product.model');
const { getCategoryById } = require('../../models/CategoriesOnProducts.model');
const { findImageOfProductById } = require('../..//models/ImageOfProduct.model');
const { findAllCategoryOfProduct } = require('../../models/CategoryOfProduct.model');
const { getImageByType } = require('../../models/Image.model');

// _____ _____[]_____[]_____[ var - config - ... ]_____[]_____[]_____ _____

// _____ _____[]_____[]_____[ * ]_____[]_____[]_____ _____

async function action(req, res) {
  const role_current_user = process.env.BY_PASS_USER || req.user.role;

  const id = req.params.id;
  const resFindProductById = await findProductById(id);
  const resGetCategoryById = await getCategoryById(id);
  const resFindImageOfProductById = await findImageOfProductById(id);
  dataDetailProduct = {
    ...resFindProductById.payload,
    ...resGetCategoryById.payload,
    arrayImage: resFindImageOfProductById.payload
  };

  const resFindAllCategoryOfProduct = await findAllCategoryOfProduct();
  var arrayCategory = [];
  if (resFindAllCategoryOfProduct.status) {
    arrayCategory = [...resFindAllCategoryOfProduct.payload];
  }

  const resGetImageByType = await getImageByType();
  var arrayImage = [];
  if (resGetImageByType.status) {
    arrayImage = [...resGetImageByType.payload];
  }

  let sidebar_data = await sidebarControl('a51', role_current_user);

  let slugHint = dataDetailProduct.slug;
  slugHint = slugHint.split('/');
  slugHint = slugHint[slugHint.length - 1];

  dataDetailProduct = { ...dataDetailProduct, slugHint };

  res.render('cms-page/product-detail', {
    arrayImage,
    arrayCategory,
    dataDetailProduct,
    ...sidebar_data,
    layout: './layouts/cms-layout.ejs'
  });
  // res.render(sidebar_data.active_page.page_name,
  //     {
  //         ...sidebar_data,
  //         layout: "./layouts/cms.ejs",
  //     }

  // )
}

exports.action = action;

