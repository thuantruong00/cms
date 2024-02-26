const { updatePostById, findPostById, findPostBySlug } = require('../../models/Post.model');
const { findUserByRole } = require('../../models/User.model');
const { getImageByUrl } = require('../../models/Image.model');
const { updateCategoriesOnPostsById } = require('../../models/CategoriesOnPosts.model');

async function action(req, res) {
  var data = JSON.parse(JSON.stringify(req.body));
  const user = await findUserByRole('root');
  const user_id = user.id;
  var idCategoryOfPost = Number(data.selectValue);
  var idPost = Number(req.params.id);

  const resGetImageByUrl = await getImageByUrl(data.url);
  var image_id = '';
  if (resGetImageByUrl.status) {
    image_id = resGetImageByUrl.payload.id;
  }
  delete data['url'];
  delete data['selectValue'];

  const resFindPostBySlug = await findPostBySlug(data.slug);
  console.log(!resFindPostBySlug.payload);
  if (resFindPostBySlug.payload) {
    res.send({
      errCode: 1,
      message: 'The slug post already exits'
    });
  } else {
    const resFindPostById = await findPostById(idPost);
    if (resFindPostById.payload) {
      const resUpdatePostById = await updatePostById(idPost, { ...data, user_id, image_id });
      if (resUpdatePostById.status) {
        const resUpdateCategoriesOnPostsById = await updateCategoriesOnPostsById(idPost, idCategoryOfPost);
        if (resUpdateCategoriesOnPostsById.status) {
          res.send({
            errCode: 0,
            message: 'Update post successfully'
          });
        } else {
          res.send({
            errCode: 1,
            message: 'Update post failure'
          });
        }
      }
    } else {
      res.send({
        errCode: 1,
        message: 'Not found post to update'
      });
    }
  }
}

exports.action = action;

