const express = require('express');
const router = express.Router();
//set up upload image
const upload = require('express-fileupload');

router.use(upload());
// const upload = multer({ dest: 'src/statics/website/images' });

// _____ _____[]_____[]_____[ * ]_____[]_____[]_____ _____
const cors_conf = require('../../config/config.json').cors;

// _____ _____[]_____[]_____[controller]_____[]_____[]_____ _____

const accountController = require('../../controllers/cms/account.controller.js');

// const accountController = require('../../controllers/cms/accountController');

//images
const imagesReadController = require('../../controllers/cms/imagesRead.controller.js');
const uploadImageController = require('../../controllers/cms/imagesUpload.controller.js');
const deleteImageController = require('../../controllers/cms/imagesDelete.controller.js');

const customController = require('../../controllers/cms/customController');
const customUploadFileController = require('../../controllers/cms/customUploadFile.controller.js');

//static-content
const staticContentController = require('../../controllers/cms/staticContentController');
const staticContentDetailController = require('../../controllers/cms/staticContentDetailController');
const staticContentUpdateForm = require('../../controllers/cms/staticContentUpdateForm.controller');

//idk
const postCategoryController = require('../../controllers/cms/postCategoryController');
const postCategoryDetailController = require('../../controllers/cms/postCategoryDetailController');

//new-post
const newPostController = require('../../controllers/cms/newPostController');
const newPostCreateController = require('../../controllers/cms/newPostCreate.controller.js');

//post-detail
const postController = require('../../controllers/cms/postController');
const postDetailController = require('../../controllers/cms/postDetailController');
const postDetailDeleteController = require('../../controllers/cms/postDetailDelete.controller.js');
const postDetailEditController = require('../../controllers/cms/postDetailEdit.controller.js');

//category-post
const postCategoryCreateController = require('../../controllers/cms/postCategoryCreate.controller.js');
const postCategoryDeleteController = require('../../controllers/cms/postCategoryDelete.controller.js');
const postCategoryUpdateController = require('../../controllers/cms/postCategoryUpdate.controller.js');

//category-product
const productCategoryController = require('../../controllers/cms/productCategoryController');
const productCategoryCreateController = require('../../controllers/cms/productCategoryCreate.controller.js')
const productCategoryDeleteController = require('../../controllers/cms/productCategoryDelete.controller.js')
const productCategoryUpdateController = require('../../controllers/cms/productCategoryUpdate.controller.js')

const productController = require('../../controllers/cms/productController');
const productDetailController = require('../../controllers/cms/productDetailController');
const productCategoryDetailController = require('../../controllers/cms/productCategoryDetailController');
const newProductController = require('../../controllers/cms/newProductController');

const { SignInHandler, SignInViewHandler, SignOutHandler } = require('~/controllers/cms/auth.controller.js');
const {
  AccountViewHandler,
  UpdateAccountHandler,
  CreateAccountHandler
} = require('~/controllers/cms/account.controller.js');

const { isAuthenticated } = require('~/middlewares/auth.middleware.js');

// _____ _____[]_____[]_____[ router ]_____[]_____[]_____ _____
router.get('/', isAuthenticated, AccountViewHandler);
router.get('/account', isAuthenticated, AccountViewHandler);
router.get('/a', isAuthenticated, UpdateAccountHandler);

router.post('/create-account', CreateAccountHandler);
router.get('/sign-in', SignInViewHandler);
router.post('/sign-in', SignInHandler);
router.get('/sign-out', SignOutHandler);

// router.get('/account', (req, res) => {
//   accountController.action(req, res);
// });

//route static content
router.get('/static-content/:type', (req, res) => {
  staticContentController.action(req, res);
});
router.get('/static-content/:type/:id', (req, res) => {
  staticContentDetailController.action(req, res);
});
router.post('/static-content/:type/:id/update-form', (req, res) => {
  staticContentUpdateForm.action(req, res);
});

//post (create)
router.get('/new-post', (req, res) => {
  newPostController.action(req, res);
});
router.post('/new-post', (req, res) => {
  newPostCreateController.action(req, res);
});

//manage post (detail, edit, delete)
router.get('/post', (req, res) => {
  postController.action(req, res);
});
router.get('/post/:id/:category', (req, res) => {
  postDetailController.action(req, res);
});
router.post('/post/delete/:id/:category', (req, res) => {
  postDetailDeleteController.action(req, res);
});
router.post('/post/edit/:id', (req, res) => {
  postDetailEditController.action(req, res);
});

//category post
router.post('/post-category', (req, res) => {
  postCategoryCreateController.action(req, res);
});
router.post('/post-category/delete/:id', (req, res) => {
  postCategoryDeleteController.action(req, res);
});
router.post('/post-category/update/:id', (req, res) => {
  postCategoryUpdateController.action(req, res);
});

//idk
router.get('/post-category', (req, res) => {
  postCategoryController.action(req, res);
});
router.get('/post-category/:id', (req, res) => {
  postCategoryDetailController.action(req, res);
});

//category product
router.get('/product-category', (req, res) => {
  productCategoryController.action(req, res);
});
router.post('/product-category', (req, res) => {
  productCategoryCreateController.action(req, res);
});
router.post('/product-category/delete/:id', (req, res) => {
  productCategoryDeleteController.action(req, res);
});
router.post('/product-category/update/:id', (req, res) => {
  productCategoryUpdateController.action(req, res);
});


//product
router.get('/product', (req, res) => {
  productController.action(req, res);
});
router.get('/new-product', (req, res) => {
  newProductController.action(req, res);
});

router.get('/product-category/:id', (req, res) => {
  productCategoryDetailController.action(req, res);
});
router.get('/product/:id', (req, res) => {
  productDetailController.action(req, res);
});

//route images
router.get('/images/:id', (req, res) => {
  imagesReadController.action(req, res);
});
router.post('/images/upload/:id', (req, res) => {
  uploadImageController.action(req, res);
});
router.post('/images/delete/:id', (req, res) => {
  deleteImageController.action(req, res);
});


//route custom file
router.get('/custom', (req, res) => {
  customController.action(req, res);
});
router.post('/custom/upload/:type', (req, res) => {
  customUploadFileController.action(req, res);
});

// router.post('/test', cors(cors_conf), (req, res) => {
//   // res.render('layout')
//   res.send({ a: 'oke' });
// });

module.exports.cmsRouter = router;

