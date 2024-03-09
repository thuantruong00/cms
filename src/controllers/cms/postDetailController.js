// _____ _____[]_____[]_____[ module ]_____[]_____[]_____ _____

const sidebarControl = require('../../services/cms/sidebarControl');
const { findPostById } = require('../../models/Post.model');
const { getImageByType } = require('../../models/Image.model');
const { findAllCategory } = require('../../models/CategoryOfPost.model');
const { findCategoriesOnPostsById } = require('../../models/CategoriesOnPosts.model');

// _____ _____[]_____[]_____[ var - config - ... ]_____[]_____[]_____ _____

// _____ _____[]_____[]_____[ * ]_____[]_____[]_____ _____

async function action(req, res) {
  const role_current_user = process.env.BY_PASS_USER || req.user.role;
  const idPostDetail = req.params.id;
  const idCategory = req.params.category;

  const resFindPostById = await findPostById(Number(req.params.id));
  var dataPostDetailById = {};
  if (resFindPostById.status) {
    dataPostDetailById = resFindPostById.payload;
    var status = dataPostDetailById.status === 'active' ? true : false;
    dataPostDetailById = { ...dataPostDetailById, status };
  }

  const resDB = await getImageByType('post');
  var arrayImage = [];
  if (resDB.status) {
    arrayImage = [...resDB.payload];
  } else {
    //handle failure
  }

  const resFindAllCategory = await findAllCategory('');
  var arrayCategory = [];
  if (resFindAllCategory.status) {
    arrayCategory = [...resFindAllCategory.payload];
  } else {
    //handle failure
  }

  const resFindCategoriesOnPostsById = await findCategoriesOnPostsById(Number(idPostDetail), Number(idCategory));
  var idCategoryOfPost = resFindCategoriesOnPostsById.payload.post_category_id;

  var hint = dataPostDetailById.slug;
  hint = hint.split('/');
  hint = hint[hint.length - 1];

  dataPostDetailById = { ...dataPostDetailById, hint };
  let sidebar_data = await sidebarControl('a41', role_current_user);

  res.render('cms-page/post-detail', {
    idCategoryOfPost,
    arrayCategory,
    idPostDetail,
    arrayImage,
    dataPostDetailById,
    ...sidebar_data,
    layout: './layouts/cms-layout.ejs'
  });
}

exports.action = action;

