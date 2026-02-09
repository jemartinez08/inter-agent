const pool = require("../config/db");
const { v4: uuidv4 } = require("uuid");

exports.createCandidate = async (rftId, { full_name, email, resume_text }) => {
  const id = uuidv4();

  await pool.query(
    `INSERT INTO candidate (id, rft_id, full_name, email, resume_text)
     VALUES (?, ?, ?, ?, ?)`,
    [id, rftId, full_name, email, resume_text],
  );

  return { id, rft_id: rftId, full_name, email };
};

exports.getCandidatesByRft = async (rftId) => {
  const [rows] = await pool.query(
    `
    SELECT
      c.id,
      c.rft_id,
      c.full_name,
      c.email,
      c.resume_text,

      MAX(CASE WHEN d.type = 'CV' THEN d.id END) AS resume_document_id,
      MAX(CASE WHEN d.type = 'INTERVIEW_TRANSCRIPT' THEN d.id END) AS transcription_document_id

    FROM candidate c
    LEFT JOIN candidate_document d
      ON d.candidate_id = c.id

    WHERE c.rft_id = ?
    GROUP BY c.id
    `,
    [rftId],
  );

  return rows.map((row) => ({
    id: row.id,
    rft_id: row.rft_id,
    full_name: row.full_name,
    email: row.email,
    resume_text: row.resume_text,
    documents: {
      resume: row.resume_document_id,
      transcription: row.transcription_document_id,
    },
  }));
};

exports.getCandidateById = async (id) => {
  const [rows] = await pool.query(
    `
    SELECT
      c.id,
      c.rft_id,
      c.full_name,
      c.email,
      c.resume_text,

      MAX(CASE WHEN d.type = 'CV' THEN d.id END) AS resume_document_id,
      MAX(CASE WHEN d.type = 'INTERVIEW_TRANSCRIPT' THEN d.id END) AS transcription_document_id

    FROM candidate c
    LEFT JOIN candidate_document d
      ON d.candidate_id = c.id

    WHERE c.id = ?
    GROUP BY c.id
    `,
    [id],
  );

  if (rows.length === 0) return null;

  const row = rows[0];

  return {
    id: row.id,
    rft_id: row.rft_id,
    full_name: row.full_name,
    email: row.email,
    resume_text: row.resume_text,
    documents: {
      resume: row.resume_document_id,
      transcription: row.transcription_document_id,
    },
  };
};

exports.deleteCandidate = async (id) => {
  await pool.query("DELETE FROM candidate WHERE id=?", [id]);
};
