const express = require('express');
const controller = require('../controllers/rfts.controller');

const router = express.Router();

router.post('/', controller.createRft);
router.get('/', controller.getRfts);
router.get('/:id', controller.getRftById);
router.put('/:id', controller.updateRft);
router.delete('/:id', controller.deleteRft);

module.exports = router;
