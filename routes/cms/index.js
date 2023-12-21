// _____ _____[]_____[]_____[ module ]_____[]_____[]_____ _____
var express = require('express');
var router = express.Router();
const cors = require('cors')

// _____ _____[]_____[]_____[ * ]_____[]_____[]_____ _____
const cors_conf = require("../../config/config.json").cors;

// _____ _____[]_____[]_____[ controller ]_____[]_____[]_____ _____
const accountController = require('../../controllers/cms/accountController')
const imagesController = require('../../controllers/cms/imagesController')
const customController = require('../../controllers/cms/customController')

const staticContentController = require('../../controllers/cms/staticContentController')
const staticContentNotificationController = require('../../controllers/cms/staticContentNotificationController')

const postCategoryController = require('../../controllers/cms/postCategoryController')
const postController = require('../../controllers/cms/postController')

const productCategoryController = require('../../controllers/cms/productCategoryController')
const productController = require('../../controllers/cms/productController')
const productDetailController = require('../../controllers/cms/productDetailController')

// _____ _____[]_____[]_____[ router ]_____[]_____[]_____ _____
router.get('/login',
    (req, res) => {

        res.render('login', { head: { page_title: "login" } })
    }
);
router.get('/',

    (req, res) => {
        accountController.action(req, res);
    }
);
router.get('/account',
    (req, res) => {
        accountController.action(req, res);
    }
);
router.get('/static-content',
    (req, res) => {
        staticContentController.action(req, res)
    }
);
router.get('/static-content-notification',
    (req, res) => {
        staticContentNotificationController.action(req, res)
    }
);


router.get('/post',
    (req, res) => {
        postController.action(req, res)
    }
);
router.get('/post-category',
    (req, res) => {
        postCategoryController.action(req, res)
    }
);

router.get('/product',
    (req, res) => {
        productController.action(req, res)
    }
);
router.get('/product-category',
    (req, res) => {
        productCategoryController.action(req, res)
    }
);


router.get('/images',
    (req, res) => {
        imagesController.action(req, res)
    }
);
router.get('/custom',
    (req, res) => {
        customController.action(req, res)
    }
);
router.get('/product/:id',
    (req, res) => {
        productDetailController.action(req, res)
    }
);


router.post('/test',
    cors(cors_conf),
    (req, res) => {
        // res.render('layout')
        res.send({ a: "oke" })
    }
);


module.exports = router;
