const express = require('express');
const controller = require('../controllers/analyses.controller');

const router = express.Router();

router.post('/', controller.createAnalysis);
router.get('/', controller.getAnalyses);
router.get('/:id', controller.getAnalysisById);
router.get('/rft/:rftNumber', controller.getAnalysesByRft);
router.put('/:id', controller.updateAnalysis);
router.delete('/:id', controller.deleteAnalysis);

module.exports = router;
