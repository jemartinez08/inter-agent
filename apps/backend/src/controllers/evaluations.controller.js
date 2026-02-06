const service = require('../services/evaluations.service');

exports.createEvaluation = async (req, res) => {
  const evaluation = await service.createEvaluation(
    req.params.candidateId,
    req.body
  );
  res.status(201).json(evaluation);
};

exports.getEvaluationsByCandidate = async (req, res) => {
  const evaluations = await service.getEvaluationsByCandidate(
    req.params.candidateId
  );
  res.json(evaluations);
};

exports.getEvaluationById = async (req, res) => {
  const evaluation = await service.getEvaluationById(req.params.id);
  res.json(evaluation);
};
