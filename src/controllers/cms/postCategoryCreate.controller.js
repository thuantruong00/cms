const { createCategory } = require('../../models/CategoryOfPost.model');
const { findUserByRole } = require('../../models/User.model');
const { findCategoryBySlug } = require('../../models/CategoryOfPost.model');

async function action(req, res) {
  const obj = JSON.parse(JSON.stringify(req.body));
  const { postName, postSlug, postDescription } = obj;

  const user = await findUserByRole('root');
  const user_id = user.id;

  const resFindCategoryBySlug = await findCategoryBySlug(postSlug);

  if (resFindCategoryBySlug.status) {
    if (resFindCategoryBySlug.payload.length == 0) {
      const resCreateCategory = await createCategory({
        name: postName,
        slug: postSlug,
        description: postDescription,
        user_id
      });
      if (resCreateCategory.status) {
        res.send({
          errCode: 0,
          message: 'Create category successfully'
        });
      } else {
        res.send({
          errCode: 1,
          message: 'Error from DB'
        });
      }
    } else {
      res.send({
        errCode: 1,
        message: `Category's name already exists.`
      });
    }
  }
}
exports.action = action;

