const { deleteCategoryProductById, findCategoryOfProductById } = require('../../models/CategoryOfProduct.model');

async function action(req, res) {
  const id = Number(req.params.id)
  const resFindCategoryOfProductById = await findCategoryOfProductById(id);
  console.log(resFindCategoryOfProductById)

  if (resFindCategoryOfProductById.status) {
    const resDeleteCategoryProductById = await deleteCategoryProductById(id);

    if (resDeleteCategoryProductById.status) {
      res.send({
        errCode: 0,
        message: resDeleteCategoryProductById.message
      });
    } else {
      res.send({
        errCode: 1,
        message: 'Can not delete category.'
      });
    }
  } else {
    res.send({
      errCode: 1,
      message: 'Category dose not exits.'
    });
  }
}

exports.action = action;

