// _____ _____[]_____[]_____[ module ]_____[]_____[]_____ _____
const sidebarControl = require('../../services/cms/sidebarControl');
const fs = require('fs').promises;

// _____ _____[]_____[]_____[ var - config - ... ]_____[]_____[]_____ _____

// _____ _____[]_____[]_____[ * ]_____[]_____[]_____ _____

function readCssFile(cssFilePath) {
  return fs
    .readFile(cssFilePath, 'utf8')
    .then((cssContent) => {
      return cssContent;
    })
    .catch((error) => {
      console.error(`Error reading CSS file: ${error}`);
      throw error;
    });
}

async function action(req, res) {
  var cssFilePath = `./src/statics/cms/styles/custom.css`;
  var jsFilePath = `./src/statics/cms/scripts/custom.js`;

  const dataCss = await readCssFile(cssFilePath);

  const dataJs = await readCssFile(jsFilePath);


  const role_current_user = process.env.BY_PASS_USER || req.user.role;
  let sidebar_data = await sidebarControl('a6', role_current_user);

  res.render(sidebar_data.active_page.page_name, {
    dataCss,
    dataJs,
    ...sidebar_data,
    layout: './layouts/cms-layout.ejs'
  });
}

exports.action = action;

