const express = require('express');
const controller = require('../controllers/evaluations.controller');

const router = express.Router();

router.post(
  '/candidates/:candidateId/evaluations',
  controller.createEvaluation
);

router.get(
  '/candidates/:candidateId/evaluations',
  controller.getEvaluationsByCandidate
);

router.get('/evaluations/:id', controller.getEvaluationById);

module.exports = router;
