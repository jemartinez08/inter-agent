const pool = require('../config/db');
const { v4: uuidv4 } = require('uuid');

exports.createRft = async ({ name, role, status = 'OPEN' }) => {
  const id = uuidv4();

  await pool.query(
    `INSERT INTO rft (id, name, role, status)
     VALUES (?, ?, ?, ?)`,
    [id, name, role, status]
  );

  return { id, name, role, status };
};

exports.getRfts = async () => {
  const [rows] = await pool.query('SELECT * FROM rft');
  return rows;
};

exports.getRftById = async (id) => {
  const [rows] = await pool.query(
    'SELECT * FROM rft WHERE id = ?',
    [id]
  );
  return rows[0];
};

exports.updateRft = async (id, { name, role, status }) => {
  await pool.query(
    `UPDATE rft SET name=?, role=?, status=? WHERE id=?`,
    [name, role, status, id]
  );

  return { id, name, role, status };
};

exports.deleteRft = async (id) => {
  await pool.query('DELETE FROM rft WHERE id=?', [id]);
};
