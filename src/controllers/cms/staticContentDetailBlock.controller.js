
// _____ _____[]_____[]_____[ module ]_____[]_____[]_____ _____
const sidebarControl = require('../../services/cms/sidebarControl');
const { findAllSectionOfPagesByPageId } = require('../../models/SectionOfPage.model');

// _____ _____[]_____[]_____[ var - config - ... ]_____[]_____[]_____ _____

// _____ _____[]_____[]_____[ * ]_____[]_____[]_____ _____

async function action(req, res) {
  let sidebar_data = await sidebarControl('a22', 'root');
  const pageId = req.params.id;
  const arraySectionByPageId = await findAllSectionOfPagesByPageId(Number(pageId));
  res.render('cms-page/static-content-detail-block', {
    arraySectionByPageId,
    ...sidebar_data,
    pageId,
    layout: './layouts/cms-layout.ejs'
  });
}

exports.action = action;

