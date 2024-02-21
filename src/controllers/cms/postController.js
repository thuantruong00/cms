// _____ _____[]_____[]_____[ module ]_____[]_____[]_____ _____
const sidebarControl = require('../../services/cms/sidebarControl');
const { findAllPost } = require('../../models/Post.model');

// _____ _____[]_____[]_____[ var - config - ... ]_____[]_____[]_____ _____

// _____ _____[]_____[]_____[ * ]_____[]_____[]_____ _____

async function action(req, res) {
  const role_current_user = process.env.BY_PASS_USER || req.user.role;

  let sidebar_data = await sidebarControl('a41', role_current_user);

  const resFindAllPost = await findAllPost();
  var arrayPosts = [];
  if (resFindAllPost.status) {
    arrayPosts = [...resFindAllPost.payload];
  }

  res.render(sidebar_data.active_page.page_name, {
    arrayPosts,
    ...sidebar_data,
    layout: './layouts/cms-layout.ejs'
  });
}

exports.action = action;

