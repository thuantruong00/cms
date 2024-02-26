// _____ _____[]_____[]_____[ module ]_____[]_____[]_____ _____
const sidebarControl = require('../../services/cms/sidebarControl');
const { findAllCategory } = require('../../models/CategoryOfPost.model');

// _____ _____[]_____[]_____[ var - config - ... ]_____[]_____[]_____ _____

// _____ _____[]_____[]_____[ * ]_____[]_____[]_____ _____

async function action(req, res) {
  const role_current_user = process.env.BY_PASS_USER || req.user.role;

  let sidebar_data = await sidebarControl('a43', role_current_user);
  const resFindAllCategory = await findAllCategory('Other');
  var arrayCategory = [];
  if (resFindAllCategory.status) {
    arrayCategory = [...resFindAllCategory.payload];
  }

  arrayCategory = arrayCategory.reverse();
  res.render(sidebar_data.active_page.page_name, {
    arrayCategory,
    ...sidebar_data,
    layout: './layouts/cms-layout.ejs'
  });
}

exports.action = action;

