const { findUserByRole, createUserRoot } = require('~/models/User.model.ts');
const { createInitPage, getAllPages } = require('~/models/Page.model.ts');
const { createInitSectionOfPage, getAllSectionOfPages } = require('~/models/SectionOfPage.model.ts');
const { createCategory, findAllCategory } = require('~/models/CategoryOfPost.model.ts');
const {createCategoryOfProduct,findAllCategoryOfProduct} = require('~/models/CategoryOfProduct.model.ts')

//init file
const { dataInitPage } = require('../../config/init/init-page');
const { dataInitSectionPage } = require('../../config/init/init-section-page');

const Init = async () => {
  //handle create root
  const userArrayByRole = await findUserByRole('root');
  if (!userArrayByRole) {
    await createUserRoot();
  }
  const user = await findUserByRole('root');
  var user_id = user.id;

  //handle init page
  const pageArray = await getAllPages();
  if (pageArray.status) {
    if (pageArray.payload.length === 0) {
      await createInitPage(dataInitPage, user_id);
    }
  }

  //handle init section of page
  const sectionArray = await getAllSectionOfPages();
  if (sectionArray.status) {
    if (sectionArray.payload.length === 0) {
      await createInitSectionOfPage(dataInitSectionPage);
    }
  }

  const categoryArray = await findAllCategory();
  if (categoryArray.payload.length === 0) {
    await createCategory({
      name: 'Other',
      slug: '/cms/post-category/other',
      description: 'none',
      user_id: user_id
    });
  }

  const resFindAllCategoryOfProduct = await findAllCategoryOfProduct()
  if(resFindAllCategoryOfProduct.payload.length === 0) {
    await createCategoryOfProduct({
      name: 'Other',
      slug: '/cms/product-category/other',
      description: 'none',
      user_id: user_id
    });
  }
};

module.exports = { Init };

