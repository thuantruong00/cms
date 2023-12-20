var express = require('express');
var router = express.Router();
const cors = require('cors')
// ===== ===== ===== =====
const cors_conf = require("../../config/config.json").cors;

// ===== ===== ===== =====
// ===== ===== router ===== =====
router.get('/login',
    (req, res) => {
        res.render('admin-login', {page_title:"login"})
    }
);
router.get('/admin',
    (req, res) => {
        res.render('admin-account', {page_title:"admin-account", href:"account"})
    }
);
router.get('/admin/account',    
    (req, res) => {
        res.render('admin-account', {page_title:"admin-account", href:"account"})
    }
);
router.get('/admin/static-list',    
    (req, res) => {
        res.render('admin-static-content-list', {page_title:"admin-static-content-list", href:"static-list"})
    }
);
router.get('/admin/static-noti',    
    (req, res) => {
        res.render('admin-static-content-noti', {page_title:"admin-static-content-noti", href:"static-noti"})
    }
);


router.get('/admin/post-list',    
    (req, res) => {
        res.render('admin-post-list', {page_title:"admin-post-list", href:"post-list"})
    }
);
router.get('/admin/post-category',    
    (req, res) => {
        res.render('admin-post-category', {page_title:"admin-post-category", href:"post-category"})
    }
);

router.post('/test',
    cors(cors_conf),
    (req, res) => {
        // res.render('layout')
        res.send({a:"oke"})
    }
);


module.exports = router;
