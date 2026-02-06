const pool = require('../config/db');
const { v4: uuidv4 } = require('uuid');

exports.createCandidate = async (rftId, { full_name, email, resume_text }) => {
  const id = uuidv4();

  await pool.query(
    `INSERT INTO candidate (id, rft_id, full_name, email, resume_text)
     VALUES (?, ?, ?, ?, ?)`,
    [id, rftId, full_name, email, resume_text]
  );

  return { id, rft_id: rftId, full_name, email };
};

exports.getCandidatesByRft = async (rftId) => {
  console.log('Service: Getting candidates for RFT', rftId);
  const [rows] = await pool.query(
    'SELECT * FROM candidate WHERE rft_id = ?',
    [rftId]
  );
  return rows;
};

exports.getCandidateById = async (id) => {
  const [rows] = await pool.query(
    'SELECT * FROM candidate WHERE id = ?',
    [id]
  );
  return rows[0];
};

exports.deleteCandidate = async (id) => {
  await pool.query('DELETE FROM candidate WHERE id=?', [id]);
};
