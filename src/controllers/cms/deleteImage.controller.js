const { deleteImageMany, getImageByID } = require('../../models/Image.model');
const fs = require('fs');

async function action(req, res) {
  const folderName = req.params.id ? req.params.id : 'general';
  console.log(folderName);
  const data = req.body.id;

  const array = Array.isArray(data) ? data.map((item) => Number(item)) : [Number(data)];

  if (data.length > 0) {
    for (const item of array) {
      const image = await getImageByID(item);
      if (image.status) {
        const file_name = image.payload.file_name;
        const filePath = `./src/statics/website/images/${folderName}/${file_name}`;
        console.log(filePath);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        } else {
          console.log('no find');
        }
      }
    }
    const resDB = await deleteImageMany(array);
    console.log(resDB);
    if (resDB.status) {
      res.send(resDB.payload);
    } else {
      //handle failure
    }
  }
}

exports.action = action;

