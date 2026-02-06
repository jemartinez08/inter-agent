const service = require('../services/users.service');

exports.createUser = async (req, res) => {
  const user = await service.createUser(req.body);
  res.status(201).json(user);
};

exports.getUsers = async (req, res) => {
  const users = await service.getUsers();
  res.json(users);
};

exports.getUserById = async (req, res) => {
  const user = await service.getUserById(req.params.id);
  res.json(user);
};

exports.updateUser = async (req, res) => {
  const user = await service.updateUser(req.params.id, req.body);
  res.json(user);
};

exports.deleteUser = async (req, res) => {
  await service.deleteUser(req.params.id);
  res.status(204).end();
};
