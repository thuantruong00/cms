const { deleteById } = require('../../models/Post.model');
const { deleteCategoriesOnPosts } = require('../../models/CategoriesOnPosts.model');

async function action(req, res) {
  console.log(Number(req.params.id), Number(req.params.category));

  const resDeleteCategoriesOnPosts = await deleteCategoriesOnPosts(Number(req.params.id), Number(req.params.category));
  if (resDeleteCategoriesOnPosts.status) {
    const resDeleteById = await deleteById(Number(req.params.id));
    if (resDeleteById.status) {
      res.send({
        resDeleteById
      });
    }
  }
}

exports.action = action;

