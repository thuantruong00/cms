// _____ _____[]_____[]_____[ module ]_____[]_____[]_____ _____
const sidebarControl = require('~/services/cms/sidebarControl');

// _____ _____[]_____[]_____[ var - config - ... ]_____[]_____[]_____ _____

// _____ _____[]_____[]_____[ * ]_____[]_____[]_____ _____

// async function action(req, res) {
//   let sidebar_data = await sidebarControl('a1', 'superadmin');

//   res.render(sidebar_data.active_page.page_name, {
//     ...sidebar_data,
//     layout: './layouts/cms-layout.ejs'
//   });
// }

// exports.action = action;
const authorize = require('~/middlewares/authorization.middleware.js');
const AccountViewHandler = async (req, res, next) => {
  let sidebar_data = await sidebarControl('a1', 'superadmin');
  res.render(sidebar_data.active_page.page_name, {
    ...sidebar_data,
    layout: './layouts/cms-layout.ejs'
  });
};

const UpdateAccountHandler = [
  authorize(['root', 'superadmin']),
  (req, res, next) => {
    console.log(req);
  }
];

module.exports = { AccountViewHandler };
