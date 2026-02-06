const pool = require('../config/db');

exports.createAnalysis = async ({ rft_number, resume_analysis, interview_analysis }) => {
  const [result] = await pool.query(
    `INSERT INTO analyses (rft_number, resume_analysis, interview_analysis)
     VALUES (?, ?, ?)`,
    [rft_number, resume_analysis, interview_analysis]
  );

  return { analysis_id: result.insertId };
};

exports.getAnalysesByRft = async (rftNumber) => {
  const [rows] = await pool.query(
    'SELECT * FROM analyses WHERE rft_number = ?',
    [rftNumber]
  );
  return rows;
};
