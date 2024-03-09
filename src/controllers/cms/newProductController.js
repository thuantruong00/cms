// _____ _____[]_____[]_____[ module ]_____[]_____[]_____ _____

const sidebarControl = require('../../services/cms/sidebarControl');
const { getImageByType } = require('../../models/Image.model');
const { findAllCategoryOfProduct } = require('../../models/CategoryOfProduct.model');

// import sidebarControl from "../../services";

// _____ _____[]_____[]_____[ var - config - ... ]_____[]_____[]_____ _____

// _____ _____[]_____[]_____[ * ]_____[]_____[]_____ _____

async function action(req, res) {
  const role_current_user = process.env.BY_PASS_USER || req.user.role;
  let sidebar_data = await sidebarControl('a52', role_current_user);

  const resDB = await getImageByType('product');
  var arrayImage = [];
  if (resDB.status) {
    arrayImage = [...resDB.payload];
  } else {
    //handle failure
  }

  const resFindAllCategoryOfProduct = await findAllCategoryOfProduct();
  var arrayCategory = [];
  if (resFindAllCategoryOfProduct.status) {
    arrayCategory = [...resFindAllCategoryOfProduct.payload];
  }

  res.render(sidebar_data.active_page.page_name, {
    arrayCategory,
    arrayImage,
    ...sidebar_data,
    layout: './layouts/cms-layout.ejs'
  });
}

exports.action = action;

