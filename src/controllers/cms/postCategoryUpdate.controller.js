const { updateCategoryById } = require('../../models/CategoryOfPost.model');
const { findUserByRole } = require('../../models/User.model');

async function action(req, res) {
  const obj = JSON.parse(JSON.stringify(req.body));
  const { postName, postSlug, postDescription } = obj;
  const user = await findUserByRole('root');
  const user_id = user.id;
  const id = Number(req.params.id);

  const resUpdateCategoryById = await updateCategoryById(id, {
    name: postName,
    slug: postSlug,
    description: postDescription,
    user_id
  });

  console.log(resUpdateCategoryById);
  if (resUpdateCategoryById.status) {
    res.send({
      resUpdateCategoryById
    });
  }
}

exports.action = action;

