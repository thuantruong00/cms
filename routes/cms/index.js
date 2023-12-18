var express = require('express');
var router = express.Router();
const cors = require('cors')
// ===== ===== ===== =====
const cors_conf = require("../../config/config.json").cors;

// ===== ===== ===== =====
// ===== ===== router ===== =====
router.get('/',
    (req, res) => {
        res.render('index', {data_page:"index"})
    }
);

router.post('/test',
    cors(cors_conf),
    (req, res) => {
        res.render('layout')
    }
);


module.exports = router;
