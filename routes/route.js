const express = require('express');
const router = express.Router();
const controller = require('../controller/controller')

router.get('/', controller.getIndex);
router.post('/post-data', controller.postData);
router.get('/get-data', controller.getData);
router.post('/update-data', controller.updateData)

module.exports = router;