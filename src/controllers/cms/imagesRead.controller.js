// _____ _____[]_____[]_____[ module ]_____[]_____[]_____ _____
const sidebarControl = require('../../services/cms/sidebarControl');
const { getImageByType } = require('../../models/Image.model');

// _____ _____[]_____[]_____[ var - config - ... ]_____[]_____[]_____ _____

// _____ _____[]_____[]_____[ * ]_____[]_____[]_____ _____

async function action(req, res) {
  console.log(req)
  let sidebar_data = await sidebarControl('a3', 'root');
  const type = req.params.id;
  var pathFolder = `./src/statics/website/images/${type}/`;
  var fs = require('fs');
  var files = fs.readdirSync(pathFolder);
  const resDB = await getImageByType(type);

  var arrayImage = [];
  if (resDB.status) {
    arrayImage = [...resDB.payload];
  } else {
    //handle failure
  }

  res.render(sidebar_data.active_page.page_name, {
    type,
    ...sidebar_data,
    arrayImage,
    arrayFileImage: files,
    layout: './layouts/cms-layout.ejs'
  });
}

exports.action = action;

