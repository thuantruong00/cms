const { createCategory } = require('../../models/CategoryOfPost.model');
const { findUserByRole } = require('../../models/User.model');

async function action(req, res) {
  const obj = JSON.parse(JSON.stringify(req.body));
  const { postName, postSlug, postDescription } = obj;
 
  const user = await findUserByRole('root');
  const user_id = user.id;

  const resDB = await createCategory({
    name: postName,
    slug: postSlug,
    description: postDescription,
    user_id
  });
  if (resDB.status) {
    res.send({
      resDB
    });
  }
}
exports.action = action;

