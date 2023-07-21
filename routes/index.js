var express = require('express');
var router = express.Router();
var {addKeyController,getKeyController} = require('../controller/cache_controller')
/* GET home page. */
router.post('/cache/add-key',addKeyController);
router.post('/cache/get-key',getKeyController);

module.exports = router;
