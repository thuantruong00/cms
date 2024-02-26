const { deleteById, findCategoryById } = require('../../models/CategoryOfPost.model');

async function action(req, res) {
  const id = Number(req.params.id);

  const resFindCategoryById = await findCategoryById(id);

  if (resFindCategoryById.status) {
    if (resFindCategoryById.payload) {
      const resDeleteByIdRes = await deleteById(id);
      if (resDeleteByIdRes.status) {
        res.send({
          errCode: 0,
          message: 'Delete category successfully'
        });
      } else {
        res.send({
          errCode: 1,
          message: 'Delete category failure'
        });
      }
    } else {
      res.send({
        errCode: 1,
        message: 'Not found category to delete'
      });
    }
  }
}

exports.action = action;

