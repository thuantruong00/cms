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

// const accountController = require('~/controllers/cms/accountController');
const imagesController = require('../../controllers/cms/imagesController');
const uploadImageController = require('../../controllers/cms/uploadImage.controller.js');
const deleteImageController = require('../../controllers/cms/deleteImage.controller.js');

const customController = require('../../controllers/cms/customController');

const staticContentController = require('../../controllers/cms/staticContentController');
const staticContentDetailPageController = require('../../controllers/cms/staticContentDetailPageController');
const staticContentBlockController = require('../../controllers/cms/staticContentBlockController');
const staticContentDetailBlockController = require('../../controllers/cms/staticContentDetailBlock.controller');
const staticContentUpdateForm = require('../../controllers/cms/staticContentUpdateForm.controller');

const postCategoryController = require('../../controllers/cms/postCategoryController');
const postController = require('../../controllers/cms/postController');
const postDetailController = require('../../controllers/cms/postDetailController');
const postCategoryDetailController = require('../../controllers/cms/postCategoryDetailController');
const newPostController = require('../../controllers/cms/newPostController');

const productCategoryController = require('../../controllers/cms/productCategoryController');
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
router.get('/a', isAuthenticated, UpdateAccountHandler);

router.post('/create-account', CreateAccountHandler);
router.get('/sign-in', SignInViewHandler);
router.post('/sign-in', SignInHandler);
router.get('/sign-out', SignOutHandler);

router.get('/account', (req, res) => {
  accountController.action(req, res);
});


router.get('/static-content', (req, res) => {
  staticContentController.action(req, res);
});
router.get('/static-content/:id', (req, res) => {
  staticContentDetailPageController.action(req, res);
});
router.get('/static-content-block', (req, res) => {
  staticContentBlockController.action(req, res);
});
router.get('/static-content-block/:id', (req, res) => {
  staticContentDetailBlockController.action(req, res);
});

//update form
router.post('/static-content/:id/update-form', (req, res) => {
  staticContentUpdateForm.action(req, res);
});
router.get('/static-content/:id/update-form', (req, res) => {
  staticContentDetailBlockController.action(req, res);
});
router.post('/static-content-block/:id/update-form', (req, res) => {
  staticContentUpdateForm.action(req, res);
});
router.get('/static-content-block/:id/update-form', (req, res) => {
  staticContentDetailBlockController.action(req, res);
});

router.get('/post', (req, res) => {
  postController.action(req, res);
});
router.get('/new-post', (req, res) => {
  newPostController.action(req, res);
});
router.get('/post-category', (req, res) => {
  postCategoryController.action(req, res);
});
router.get('/post-category/:id', (req, res) => {
  postCategoryDetailController.action(req, res);
});
router.get('/post/:id', (req, res) => {
  postDetailController.action(req, res);
});

router.get('/product', (req, res) => {
  productController.action(req, res);
});
router.get('/new-product', (req, res) => {
  newProductController.action(req, res);
});
router.get('/product-category', (req, res) => {
  productCategoryController.action(req, res);
});
router.get('/product-category/:id', (req, res) => {
  productCategoryDetailController.action(req, res);
});
router.get('/product/:id', (req, res) => {
  productDetailController.action(req, res);
});

//upload image
router.get('/images/:id', (req, res) => {
  imagesController.action(req, res);
});
router.post('/images/upload/:id', (req, res) => {
  uploadImageController.action(req, res);
});
router.post('/images/delete/:id', (req, res) => {
  deleteImageController.action(req, res);
});

router.get('/custom', (req, res) => {
  customController.action(req, res);
});

// router.post('/test', cors(cors_conf), (req, res) => {
//   // res.render('layout')
//   res.send({ a: 'oke' });
// });

module.exports.cmsRouter = router;

