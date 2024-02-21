// _____ _____[]_____[]_____[ module ]_____[]_____[]_____ _____
const sidebarControl = require('../../services/cms/sidebarControl');
const { findAllSectionOfPagesByPageId } = require('../../models/SectionOfPage.model');
const { getImageByType } = require('../../models/Image.model');

// _____ _____[]_____[]_____[ var - config - ... ]_____[]_____[]_____ _____

// _____ _____[]_____[]_____[ * ]_____[]_____[]_____ _____

async function action(req, res) {
  const role_current_user = process.env.BY_PASS_USER || req.user.role;
  let sidebar_data = await sidebarControl('a21', role_current_user);
  const pageId = req.params.id;
  const type = req.params.type;

  const resDBImage = await getImageByType('general');
  var arrayImage = [];
  if (resDBImage.status) {
    arrayImage = [...resDBImage.payload];
  } else {
    //handle failure
  }

  const resDB = await findAllSectionOfPagesByPageId(Number(pageId));
  let arraySectionByPageId = [];
  if (resDB.status) {
    arraySectionByPageId = [...resDB.payload];
  }

  res.render('cms-page/static-content-detail', {
    arraySectionByPageId,
    arrayImage,
    type,
    ...sidebar_data,
    pageId,
    layout: './layouts/cms-layout.ejs'
  });
}

exports.action = action;

