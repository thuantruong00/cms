// _____ _____[]_____[]_____[ module ]_____[]_____[]_____ _____
const sidebarControl = require('../../services/cms/sidebarControl');
const { findAllPost } = require('../../models/Post.model');
const { findAllCategoriesOnPosts } = require('../../models/CategoriesOnPosts.model');

// _____ _____[]_____[]_____[ var - config - ... ]_____[]_____[]_____ _____

// _____ _____[]_____[]_____[ * ]_____[]_____[]_____ _____

async function action(req, res) {
  const role_current_user = process.env.BY_PASS_USER || req.user.role;

  let sidebar_data = await sidebarControl('a41', role_current_user);

  const resFindAllPost = await findAllPost();
  var arrayPosts = [];

  const resFindAllCategoriesOnPosts = await findAllCategoriesOnPosts();
  var arrayCategoriesOnPosts = [];
  if (resFindAllCategoriesOnPosts.status) {
    arrayPosts = [...resFindAllCategoriesOnPosts.payload];
    for (const item of arrayPosts) {
      const { post_id, post_category_id } = item;
      arrayCategoriesOnPosts.push({ post_id, post_category_id, ...item.post, ...item.post_category });
    }
  }
  console.log(arrayCategoriesOnPosts);

  res.render(sidebar_data.active_page.page_name, {
    arrayCategoriesOnPosts,
    ...sidebar_data,
    layout: './layouts/cms-layout.ejs'
  });
}

exports.action = action;

