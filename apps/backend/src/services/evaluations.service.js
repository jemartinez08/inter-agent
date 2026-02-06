const pool = require('../config/db');
const { v4: uuidv4 } = require('uuid');

exports.createEvaluation = async (candidateId, data) => {
  const id = uuidv4();

  const {
    model_version,
    match_score,
    core_skills_score,
    experience_score,
    domain_score,
    education_score,
    soft_skills_score,
    justification
  } = data;

  await pool.query(
    `INSERT INTO evaluation (
      id, candidate_id, model_version, match_score,
      core_skills_score, experience_score, domain_score,
      education_score, soft_skills_score, justification
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      id,
      candidateId,
      model_version,
      match_score,
      core_skills_score,
      experience_score,
      domain_score,
      education_score,
      soft_skills_score,
      JSON.stringify(justification)
    ]
  );

  return { id, candidate_id: candidateId };
};

exports.getEvaluationsByCandidate = async (candidateId) => {
  const [rows] = await pool.query(
    'SELECT * FROM evaluation WHERE candidate_id = ? ORDER BY created_at DESC',
    [candidateId]
  );
  return rows;
};

exports.getEvaluationById = async (id) => {
  const [rows] = await pool.query(
    'SELECT * FROM evaluation WHERE id = ?',
    [id]
  );
  return rows[0];
};
