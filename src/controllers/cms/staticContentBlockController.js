// _____ _____[]_____[]_____[ module ]_____[]_____[]_____ _____
const sidebarControl = require('../../services/cms/sidebarControl');
const { findPageByType } = require('../../models/Page.model');

// _____ _____[]_____[]_____[ var - config - ... ]_____[]_____[]_____ _____

// _____ _____[]_____[]_____[ * ]_____[]_____[]_____ _____

async function action(req, res) {
  let sidebar_data = await sidebarControl('a22', 'root');
  const pageArrayByPage = await findPageByType('block');
  const paramValue = req.params.param;


  res.render(sidebar_data.active_page.page_name, {
    paramValue,
    ...sidebar_data,
    pageArrayByPage,
    layout: './layouts/cms-layout.ejs'
  });
}

exports.action = action;
