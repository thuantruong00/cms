const { deleteImageMany, getImageByID } = require('../../models/Image.model');
const fs = require('fs');

async function action(req, res) {
  const folderName = req.params.id ? req.params.id : 'general';
  const data = req.body.id;

  const array = Array.isArray(data) ? data.map((item) => Number(item)) : [Number(data)];

  if (data.length > 0) {
    for (const item of array) {
      const image = await getImageByID(item);
      if (image.status) {
        const file_name = image.payload.file_name;
        const filePath = `./src/statics/website/images/${folderName}/${file_name}`;
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        } else {
        }
      }
    }
    const resDB = await deleteImageMany(array);
    if (resDB.status) {
      res.send(resDB);
    } else {
      //handle failure
    }
  }
}

exports.action = action;

