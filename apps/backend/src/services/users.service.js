const pool = require('../config/db');

exports.createUser = async ({ email, name, role }) => {
  const [result] = await pool.query(
    'INSERT INTO users (email, name, role) VALUES (?, ?, ?)',
    [email, name, role]
  );
  return { user_id: result.insertId, email, name, role };
};

exports.getUsers = async () => {
  const [rows] = await pool.query('SELECT * FROM users');
  return rows;
};

exports.getUserById = async (id) => {
  const [rows] = await pool.query(
    'SELECT * FROM users WHERE user_id = ?',
    [id]
  );
  return rows[0];
};

exports.updateUser = async (id, { email, name, role }) => {
  await pool.query(
    'UPDATE users SET email=?, name=?, role=? WHERE user_id=?',
    [email, name, role, id]
  );
  return { id, email, name, role };
};

exports.deleteUser = async (id) => {
  await pool.query('DELETE FROM users WHERE user_id=?', [id]);
};
