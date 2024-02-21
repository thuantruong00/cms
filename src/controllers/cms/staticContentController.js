// _____ _____[]_____[]_____[ module ]_____[]_____[]_____ _____
const sidebarControl = require('../../services/cms/sidebarControl');
const { getAllPageByType } = require('../../models/Page.model');

// _____ _____[]_____[]_____[ var - config - ... ]_____[]_____[]_____ _____

// _____ _____[]_____[]_____[ * ]_____[]_____[]_____ _____

async function action(req, res) {
  const type = req.params.type;
  var sidebar_data = '';
  const role_current_user = process.env.BY_PASS_USER || req.user.role;

  if (type === 'page') {
    sidebar_data = await sidebarControl('a21', role_current_user);
  } else {
    sidebar_data = await sidebarControl('a22', role_current_user);
  }
  //get all
  const resDB = await getAllPageByType(type);
  const paramValue = req.params.param;
  var pageArrayByPage = [];
  if (resDB.status) {
    pageArrayByPage = [...resDB.payload];
  }

  res.render(sidebar_data.active_page.page_name, {
    paramValue,
    type,
    ...sidebar_data,
    pageArrayByPage,
    layout: './layouts/cms-layout.ejs'
  });
}

exports.action = action;

