var express = require('express');
var router = express.Router();
var {addKeyController,getKeyController} = require('../controller/cache_controller');
const { increaseCachingCapacityController } = require('../controller/azure_controller');
/* GET home page. */
router.post('/cache/add-key',addKeyController);
router.post('/cache/get-key',getKeyController);
router.post('/user/increase-capacity',increaseCachingCapacityController);
module.exports = router;
