const express = require('express');
const controller = require('../controllers/candidates.controller');

const router = express.Router();

router.post('/rfts/:rftId/candidates', controller.createCandidate);
router.get('/rfts/:rftId/candidates', controller.getCandidatesByRft);

router.get('/candidates/:id', controller.getCandidateById);
router.delete('/candidates/:id', controller.deleteCandidate);

module.exports = router;
