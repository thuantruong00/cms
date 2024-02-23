const {deleteById} = require('../../models/CategoryOfPost.model');

async function action(req, res) {
  const deleteByIdRes = await deleteById(Number(req.params.id));
  if (deleteByIdRes.status) {
    res.send({
      deleteByIdRes
    });
  }else {
    res.send({
      deleteByIdRes
    });
  }
}

exports.action = action;

