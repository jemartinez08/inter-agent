const service = require('../services/rfts.service');

exports.createRft = async (req, res) => {
  const rft = await service.createRft(req.body);
  res.status(201).json(rft);
};

exports.getRfts = async (_req, res) => {
  const rfts = await service.getRfts();
  res.json(rfts);
};

exports.getRftById = async (req, res) => {
  const rft = await service.getRftById(req.params.id);
  res.json(rft);
};

exports.updateRft = async (req, res) => {
  const rft = await service.updateRft(req.params.id, req.body);
  res.json(rft);
};

exports.deleteRft = async (req, res) => {
  await service.deleteRft(req.params.id);
  res.status(204).end();
};
