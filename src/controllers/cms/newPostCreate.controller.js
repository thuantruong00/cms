const { createNewPost, findPostBySlug } = require('../../models/Post.model');
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

  const resFindPostBySlug = await findPostBySlug(data.slug);
  if (resFindPostBySlug.payload == null) {
    const resCreateNewPost = await createNewPost({ ...data, user_id, image_id });
    if (resCreateNewPost.status) {
      const idPost = resCreateNewPost.payload.id;
      const resCreateCategoriesOnPosts = await createCategoriesOnPosts(idPost, Number(idCategoryOfPost));
      if (resCreateCategoriesOnPosts.status) {
        res.send({
          errCode: 0,
          message: 'Create new post successfully'
        });
      } else {
        res.send({
          errCode: 1,
          message: 'Create new post failure 1'
        });
      }
    } else {
      res.send({
        errCode: 1,
        message: 'Create new post failure 2'
      });
    }
  } else {
    res.send({
      errCode: 1,
      message: 'The slug post already exits'
    });
  }
}

exports.action = action;

