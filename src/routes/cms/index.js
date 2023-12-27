// _____ _____[]_____[]_____[ module ]_____[]_____[]_____ _____
var express = require('express');
var router = express.Router();
const cors = require('cors');

// _____ _____[]_____[]_____[ * ]_____[]_____[]_____ _____
const cors_conf = require('../../config/config.json').cors;

// _____ _____[]_____[]_____[ controller ]_____[]_____[]_____ _____
// const accountController = require('../../controllers/cms/accountController')
const accountController = require('~/controllers/cms/accountController');
const imagesController = require('../../controllers/cms/imagesController');
const customController = require('../../controllers/cms/customController');

const staticContentController = require('../../controllers/cms/staticContentController');
const staticContentNotificationController = require('../../controllers/cms/staticContentNotificationController');

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


import { SignInViewHandler, SignInHandler, SignOutHandler } from '~/controllers';

// _____ _____[]_____[]_____[ router ]_____[]_____[]_____ _____
router.get('sign-in', SignInViewHandler);
router.post('sign-in', SignInHandler);
router.get('sign-out', SignOutHandler);

router.get('/login', (req, res) => {
  res.render('login', { head: { page_title: 'login' } });
});
router.get(
  '/',

router.get('/', (req, res) => {
  accountController.action(req, res);
});
router.get('/account', (req, res) => {
  accountController.action(req, res);
});
router.get('/static-content', (req, res) => {
  staticContentController.action(req, res);
});
router.get('/static-content-notification', (req, res) => {
  staticContentNotificationController.action(req, res);
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

router.get('/images', (req, res) => {
  imagesController.action(req, res);
});
router.get('/custom', (req, res) => {
  customController.action(req, res);
});

router.post('/test', cors(cors_conf), (req, res) => {
  // res.render('layout')
  res.send({ a: 'oke' });
});

module.exports = router;
