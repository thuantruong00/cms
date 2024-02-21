const { updatePostById } = require('../../models/Post.model');
const { findUserByRole } = require('../../models/User.model');
const { getImageByUrl } = require('../../models/Image.model');

async function action(req, res) {
  var data = JSON.parse(JSON.stringify(req.body));
  const user = await findUserByRole('root');
  const user_id = user.id;

  const resGetImageByUrl = await getImageByUrl(data.url);
  var image_id = '';
  if (resGetImageByUrl.status) {
    image_id = resGetImageByUrl.payload.id;
  }
  delete data['url'];

  const resUpdatePostById = await updatePostById(Number(req.params.id), { ...data, user_id, image_id });
  if (resUpdatePostById.status) {
    res.send({
      resUpdatePostById
    });
  }
}

exports.action = action;

