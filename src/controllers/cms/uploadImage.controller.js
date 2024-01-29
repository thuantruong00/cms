// _____ _____[]_____[]_____[ module ]_____[]_____[]_____ _____
const { getSizeImage } = require('../../middlewares/sizeOf.middleware');
const { createRandomString } = require('../../middlewares/createRandomString.middleware');
const { createImage } = require('../../models/Image.model');
const sizeOf = require('image-size');
const { findUserByRole, createUserRoot } = require('../../models/User.model.ts');

// _____ _____[]_____[]_____[ var - config - ... ]_____[]_____[]_____ _____

// _____ _____[]_____[]_____[ * ]_____[]_____[]_____ _____

async function action(req, res) {
  const folderName = req.params.id ? req.params.id : 'general';
  var data = [];
  var i = 0;

  if (!req.files) {
    res.send({
      errCode: 1,
      errMessage: 'Not have file'
    });
  } else {
    const arrayData = Array.isArray(req.files.file) ? req.files.file : [req.files.file];
    if (arrayData.length > 0) {
      for (var item of arrayData) {
        const randomString = createRandomString(6);
        const fileName = item.name;
        const fileExtension = fileName.split('.').pop();
        const id_user = '88e5bbe7-443d-46d5-826e-7f85698f2f5d';
        const sizeImageUpload = item.size;
        const pathName = `./src/statics/website/images/${folderName}/${randomString}.${fileExtension}`;
        // if (file.size > 20000000) {
        //   res.send({ errMessage: 'Size of image not more than 20mb' });
        // }

        item.mv(pathName, function (err) {
          if (err) {
            res.send({
              errCode: 1,
              message: err
            });
            console.log('error');
          } else {
            data.push({
              title: randomString,
              file_name: `${randomString}.${fileExtension}`,
              url: `/website/images/${folderName}/${randomString}.${fileExtension}`,
              image_of_product_id: null,
              size: sizeImageUpload,
              type: folderName,
              resolution: `${sizeOf(pathName).width}x${sizeOf(pathName).height}`,
              user_id: id_user
            });
          }
          if (arrayData.length === data.length) {
            const handleCreateImage = async () => {
              const resDB = await createImage(data);
              if (resDB.status) {
                res.send({ resData: resDB.payload });
              } else {
                //handle failure
              }
            };
            handleCreateImage();
          }
        });
      }
    }
  }
}

exports.action = action;

