const { updatePostById } = require('../../models/Post.model');
const { findUserByRole } = require('../../models/User.model');
const { getImageByUrl } = require('../../models/Image.model');
const { updateCategoriesOnPostsById } = require('../../models/CategoriesOnPosts.model');

async function action(req, res) {
  var data = JSON.parse(JSON.stringify(req.body));
  const user = await findUserByRole('root');
  const user_id = user.id;
  var idCategoryOfPost = Number(data.selectValue);
  var idPost = Number(req.params.id);
  console.log(req.params.id)

  const resGetImageByUrl = await getImageByUrl(data.url);
  var image_id = '';
  if (resGetImageByUrl.status) {
    image_id = resGetImageByUrl.payload.id;
  }
  delete data['url'];
  delete data['selectValue'];

  const resUpdatePostById = await updatePostById(idPost, { ...data, user_id, image_id });
  if (resUpdatePostById.status) {
    const resUpdateCategoriesOnPostsById = await updateCategoriesOnPostsById(idPost, idCategoryOfPost);
    if (resUpdateCategoriesOnPostsById.status) {
      res.send({
        resUpdatePostById
      });
    }
  }
}

exports.action = action;

