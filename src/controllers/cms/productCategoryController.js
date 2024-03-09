// _____ _____[]_____[]_____[ module ]_____[]_____[]_____ _____
const sidebarControl = require('../../services/cms/sidebarControl');
const { findAllCategoryOfProduct } = require('../../models/CategoryOfProduct.model');

// _____ _____[]_____[]_____[ var - config - ... ]_____[]_____[]_____ _____

// _____ _____[]_____[]_____[ * ]_____[]_____[]_____ _____

async function action(req, res) {
  const role_current_user = process.env.BY_PASS_USER || req.user.role;

  let sidebar_data = await sidebarControl('a53', role_current_user);

  const resFindAllCategoryOfProduct = await findAllCategoryOfProduct('Other');

  var arrayCategory = [];
  if (resFindAllCategoryOfProduct.status) {
    arrayCategory = [...resFindAllCategoryOfProduct.payload].reverse();
  }

  res.render(sidebar_data.active_page.page_name, {
    arrayCategory,
    ...sidebar_data,
    layout: './layouts/cms-layout.ejs'
  });
}

exports.action = action;

