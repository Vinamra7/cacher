var express = require('express');
var router = express.Router();
var { addKeyController, getKeyController } = require('../controller/cache_controller');
const { increaseCachingCapacityController,getUsedMemoryController } = require('../controller/azure_controller');
const { signUpController,loginController,getMemoryAllocatedController } = require('../controller/user_controller');
/* GET home page. */
router.post('/cache/add-key', addKeyController);
router.post('/cache/get-key', getKeyController);
router.post('/used-capacity',getUsedMemoryController);
router.post('/user/signup', signUpController);
router.post('/user/signin', loginController);
router.post("/user/increase-allocation", increaseCachingCapacityController);
router.post('/user/get-used-memory',getUsedMemoryController);

router.post('/user/get-allocated-memory',getMemoryAllocatedController);
module.exports = router;
