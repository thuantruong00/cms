const { createNewPost } = require('../../models/Post.model');
const { findUserByRole } = require('../../models/User.model');
const { getImageByUrl } = require('../../models/Image.model');

async function action(req, res) {
  const data = JSON.parse(JSON.stringify(req.body));

  const user = await findUserByRole('root');
  var user_id = user.id;

  const resGetImageByUrl = await getImageByUrl(data.url);
  var image_id = '';
  if (resGetImageByUrl.status) {
    image_id = resGetImageByUrl.payload.id;
  }
  delete data['url'];

  const resCreateNewPost = await createNewPost({ ...data, user_id, image_id });

  if (resCreateNewPost.status) {
    res.send(resCreateNewPost);
  }
}

exports.action = action;

