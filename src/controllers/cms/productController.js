// _____ _____[]_____[]_____[ module ]_____[]_____[]_____ _____
const sidebar = require('../../services/cms/sidebarControl');
const { getCategoryById } = require('../../models/CategoriesOnProducts.model');
const { findAllProduct } = require('../../models/Product.model');

// _____ _____[]_____[]_____[ var - config - ... ]_____[]_____[]_____ _____

// _____ _____[]_____[]_____[ * ]_____[]_____[]_____ _____

async function action(req, res) {
  const role_current_user = process.env.BY_PASS_USER || req.user.role;

  const resFindAllProduct = await findAllProduct();
  var arrayProductWithCategory = [];
  if (resFindAllProduct.status) {
    const arrayProduct = resFindAllProduct.payload;
    for (const item of arrayProduct) {
      const resGetCategoryById = await getCategoryById(item.id);
      arrayProductWithCategory.push(resGetCategoryById.payload);
    }
  }


  let sidebar_data = await sidebar('a51', role_current_user);

  res.render('cms-page/product', {
    arrayProductWithCategory,
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

