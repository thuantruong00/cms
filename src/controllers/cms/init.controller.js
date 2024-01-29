const { findUserByRole, createUserRoot } = require('~/models/User.model.ts');
const { createInitPage, getAllPages } = require('~/models/Page.model.ts');
const { createInitSectionOfPage, getAllSectionOfPages } = require('~/models/SectionOfPage.model.ts');

//init file
const { dataInitPage } = require('../../config/init/init-page');
const { dataInitSectionPage } = require('../../config/init/init-section-page');

const Init = async () => {
  const userArrayByRole = await findUserByRole('root');
  if (userArrayByRole.length === 0) {
    createUserRoot();
  }
  const user = await findUserByRole('root');
  const user_id = user[0].id;
  const pageArray = await getAllPages();
  if (pageArray.length === 0) {
    await createInitPage(dataInitPage, user_id);
  }
  const sectionArray = await getAllSectionOfPages();
  if (sectionArray.length === 0) {
    await createInitSectionOfPage(dataInitSectionPage);
  }

  // const fs = require('fs');
  // const filePath = './src/statics/website/images/product/fbxwqN9950.png';

  // // Check if the file exists before attempting to delete it
  // if (fs.existsSync(filePath)) {
  //   // Delete the file
  //   fs.unlinkSync(filePath);
  //   console.log(`File ${filePath} has been deleted.`);
  // } else {
  //   console.log(`File ${filePath} does not exist.`);
  // }
};

module.exports = { Init };

