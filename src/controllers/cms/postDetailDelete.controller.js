const { deleteById } = require('../../models/Post.model');

async function action(req, res) {
  const resDeleteById = await deleteById(Number(req.params.id));
  if (resDeleteById.status) {
    res.send({
      resDeleteById
    });
  }
}

exports.action = action;

