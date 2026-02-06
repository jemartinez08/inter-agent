const service = require('../services/candidates.service');

exports.createCandidate = async (req, res) => {
  console.log('Controller: Creating candidate for RFT', req.params.rftId, 'with data:', req.body);
  const candidate = await service.createCandidate(
    req.params.rftId,
    req.body
  );
  res.status(201).json(candidate);
};

exports.getCandidatesByRft = async (req, res) => {
  console.log('Hola')
  const candidates = await service.getCandidatesByRft(req.params.rftId);
  console.log("Candidates for RFT", req.params.rftId, ":", candidates);
  res.json(candidates);
};

exports.getCandidateById = async (req, res) => {
  const candidate = await service.getCandidateById(req.params.id);
  res.json(candidate);
};

exports.deleteCandidate = async (req, res) => {
  await service.deleteCandidate(req.params.id);
  res.status(204).end();
};
