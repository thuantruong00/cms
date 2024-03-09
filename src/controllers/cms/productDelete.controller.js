const { deleteProductById, findProductById } = require('../../models/Product.model');
const { deleteCategoriesOnProducts } = require('../../models/CategoriesOnProducts.model');
const { deleteImageOfProduct } = require('../../models/ImageOfProduct.model');

async function action(req, res) {
  const id = req.params.id;

  const resFindProductById = await findProductById(id);
  console.log(Boolean(resFindProductById.payload));

  if (resFindProductById.payload) {
    await deleteCategoriesOnProducts(id);
    await deleteImageOfProduct(id);
    await deleteProductById(id);

    res.send({
      errCode: 0,
      message: 'Delete product successfully.'
    });
  } else {
    res.send({
      errCode: 1,
      message: 'Not found product to delete.'
    });
  }
}

exports.action = action;

