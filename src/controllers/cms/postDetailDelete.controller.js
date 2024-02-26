const { deleteById, findPostById } = require('../../models/Post.model');
const { deleteCategoriesOnPosts } = require('../../models/CategoriesOnPosts.model');

async function action(req, res) {
  const id = Number(req.params.id);
  const categoryId = Number(req.params.category);

  const resFindPostById = await findPostById(id);
  if (resFindPostById.payload) {
    const resDeleteCategoriesOnPosts = await deleteCategoriesOnPosts(id, categoryId);
    if (resDeleteCategoriesOnPosts.status) {
      const resDeleteById = await deleteById(id);
      if (resDeleteById.status) {
        res.send({
          errCode: 0,
          message: 'Delete post successfully'
        });
      }
    }
  } else {
    res.send({
      errCode: 1,
      message: 'Not found post to delete'
    });
  }
}

exports.action = action;

