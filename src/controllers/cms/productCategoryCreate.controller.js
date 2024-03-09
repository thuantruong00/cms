const {
  createCategoryOfProduct,
  findCategoryOfProductByParentId,
  findCategoryOfProductBySlug
} = require('../../models/CategoryOfProduct.model');
const { findUserByRole } = require('../../models/User.model');

async function action(req, res) {
  var data = JSON.parse(JSON.stringify(req.body));
  if (data.parent_id == '') {
    data.parent_id = null;
  } else {
    data.parent_id = Number(data.parent_id);
    const id = data.parent_id;

    const resFindCategoryOfProductByParentId = await findCategoryOfProductByParentId(id);
    if (resFindCategoryOfProductByParentId.status) {
      res.send({
        errCode: 1,
        message: 'This category has been selected, please select another category'
      });
    }
  }
  const resFindCategoryOfProductBySlug = await findCategoryOfProductBySlug(data.slug);

  const user = await findUserByRole('root');
  const user_id = user.id;
  if (resFindCategoryOfProductBySlug.payload === null) {
    const resCreateCategoryOfProduct = await createCategoryOfProduct({ ...data, user_id });
    console.log(resCreateCategoryOfProduct);
    if (resCreateCategoryOfProduct.status) {
      res.send({
        errCode: 0,
        message: resCreateCategoryOfProduct.message
      });
    }
  } else {
    res.send({
      errCode: 1,
      message: `Category's slug already exists.`
    });
  }
}

exports.action = action;

