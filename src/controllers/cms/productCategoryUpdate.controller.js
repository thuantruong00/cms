const {
  findCategoryOfProductById,
  updateCategoryOfProduct,
  findCategoryOfProductBySlug
} = require('../../models/CategoryOfProduct.model');

async function action(req, res) {
  const id = Number(req.params.id);
  const data = JSON.parse(JSON.stringify(req.body));
  const resFindCategoryOfProductById = await findCategoryOfProductById(id);

  if (resFindCategoryOfProductById.status) {
    const resFindCategoryOfProductBySlug = await findCategoryOfProductBySlug(data.slug);
    if (resFindCategoryOfProductBySlug.payload == null) {
      const resUpdateCategoryOfProduct = await updateCategoryOfProduct(id, data);

      if (resUpdateCategoryOfProduct.status) {
        res.send({
          errCode: 0,
          message: resUpdateCategoryOfProduct.message
        });
      } else {
        res.send({
          errCode: 1,
          message: 'Can not update category.'
        });
      }
    } else {
      res.send({
        errCode: 1,
        message: `Category's slug already exists.`
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

