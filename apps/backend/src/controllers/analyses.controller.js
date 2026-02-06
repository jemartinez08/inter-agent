const service = require('../services/analyses.service');

exports.createAnalysis = async (req, res) => {
  const analysis = await service.createAnalysis(req.body);
  res.status(201).json(analysis);
};

exports.getAnalyses = async (req, res) => {
  const analyses = await service.getAnalyses();
  res.json(analyses);
};

exports.getAnalysisById = async (req, res) => {
  const analysis = await service.getAnalysisById(req.params.id);
  res.json(analysis);
};

exports.getAnalysesByRft = async (req, res) => {
  const analyses = await service.getAnalysesByRft(req.params.rftNumber);
  res.json(analyses);
};

exports.updateAnalysis = async (req, res) => {
  const analysis = await service.updateAnalysis(req.params.id, req.body);
  res.json(analysis);
};

exports.deleteAnalysis = async (req, res) => {
  await service.deleteAnalysis(req.params.id);
  res.status(204).end();
};
