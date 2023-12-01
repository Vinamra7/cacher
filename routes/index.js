var express = require('express');
var router = express.Router();
var { addKeyController, getKeyController } = require('../controller/cache_controller');
const { increaseCachingCapacityController,getUsedMemoryController } = require('../controller/azure_controller');
const { signUpController, increaseAllocationController,loginController } = require('../controller/user_controller');
/* GET home page. */
router.post('/cache/add-key', addKeyController);
router.post('/cache/get-key', getKeyController);
router.post('/increase-capacity', increaseCachingCapacityController);
router.post('/used-capacity',getUsedMemoryController);
router.post('/user/signup', signUpController);
router.post('/user/signin', loginController);
router.post("/user/increase-allocation", increaseAllocationController);
router.post('/user/get-used-memory',getUsedMemoryController);
module.exports = router;
