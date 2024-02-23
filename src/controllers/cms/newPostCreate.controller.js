const { createNewPost } = require('../../models/Post.model');
const { findUserByRole } = require('../../models/User.model');
const { getImageByUrl } = require('../../models/Image.model');
const { createCategoriesOnPosts } = require('../../models/CategoriesOnPosts.model');

async function action(req, res) {
  const data = JSON.parse(JSON.stringify(req.body));

  const user = await findUserByRole('root');
  var user_id = user.id;
  var idCategoryOfPost = data.selectValue;

  const resGetImageByUrl = await getImageByUrl(data.url);
  var image_id = '';
  if (resGetImageByUrl.status) {
    image_id = resGetImageByUrl.payload.id;
  }
  delete data['url'];
  delete data['selectValue'];

  const resCreateNewPost = await createNewPost({ ...data, user_id, image_id });

  if (resCreateNewPost.status) {
    const idPost = resCreateNewPost.payload.id;
    console.log(idPost, ' ', Number(idCategoryOfPost));
    const resCreateCategoriesOnPosts = await createCategoriesOnPosts(idPost, Number(idCategoryOfPost));
    if (resCreateCategoriesOnPosts.status) {
      res.send(resCreateNewPost);
    }
  }
}

exports.action = action;

