const sizeOf = require('image-size');

const getSizeImage = (folderName, randomString, fileExtension) => {
  sizeOf(`../cms/src/statics//website/images/${folderName}/${randomString}.${fileExtension}`, function (err, dimensions) {
    if (err) throw err;
    return `${dimensions.width}x${dimensions.height}`;
  });
};

module.exports = { getSizeImage };

