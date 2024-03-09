const { updateCategoryById, findCategoryById, findCategoryBySlug } = require('../../models/CategoryOfPost.model');
const { findUserByRole } = require('../../models/User.model');

async function action(req, res) {
  const obj = JSON.parse(JSON.stringify(req.body));
  const { postName, postSlug, postDescription } = obj;
  const user = await findUserByRole('root');
  const user_id = user.id;
  const id = Number(req.params.id);

  const resFindCategoryById = await findCategoryById(id);

  if (resFindCategoryById.status) {
    if (resFindCategoryById.payload) {

      const resFindCategoryBySlug = await findCategoryBySlug(postSlug, id);
      if (resFindCategoryBySlug.payload.length == 0) {
        const resUpdateCategoryById = await updateCategoryById(id, {
          name: postName,
          slug: postSlug,
          description: postDescription,
          user_id
        });

        if (resUpdateCategoryById.status) {
          res.send({
            errCode: 0,
            message: 'Update category successfully'
          });
        } else {
          res.send({
            errCode: 1,
            message: 'Update category failure'
          });
        }
      } else {
        res.send({
          errCode: 1,
          message: `Category's slug already exists`
        });
      }
    } else {
      res.send({
        errCode: 1,
        message: 'Not found category to update'
      });
    }
  }
}

exports.action = action;

