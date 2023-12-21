var express = require('express');
var router = express.Router();
const cors = require('cors')

// ===== ===== ===== =====
const cors_conf = require("../../config/config.json").cors;

// ===== ===== controller ===== =====
const sidebarController = require('../../core/controllers/cms/sidebarController')

// ===== ===== router ===== =====
router.get('/login',
    (req, res) => {
        
        res.render('login', { page_title: "login" })
    }
);
router.get('/',

    (req, res) => {
        console.log("a")
        sidebarController.getSidebarContent(req, res, "account")
    }
);
router.get('/account',
    (req, res) => {
        sidebarController.getSidebarContent(req, res, "account")
    }
);
router.get('/static-list',
    (req, res) => {
        sidebarController.getSidebarContent(req, res, 'static-list')
    }
);
router.get('/static-noti',
    (req, res) => {
        sidebarController.getSidebarContent(req, res, 'static-noti')
    }
);


router.get('/post-list',
    (req, res) => {
        sidebarController.getSidebarContent(req, res, 'post-list')
    }
);
router.get('/post-category',
    (req, res) => {
        sidebarController.getSidebarContent(req, res, 'post-category')
    }
);

router.get('/product-list',
    (req, res) => {
        sidebarController.getSidebarContent(req, res, 'product-list')
    }
);
router.get('/product-category',
    (req, res) => {
        sidebarController.getSidebarContent(req, res, 'product-category')
    }
);


router.get('/image',
    (req, res) => {
        sidebarController.getSidebarContent(req, res, "image")
    }
);
router.get('/custom',
    (req, res) => {
        sidebarController.getSidebarContent(req, res, "custom")
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
