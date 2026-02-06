const pool = require("../config/db");
const storage = require("../storage");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

exports.uploadCandidateDocument = async (candidateId, file, type) => {
  const documentId = uuidv4();

  const extension = path.extname(file.originalname);
  const filename = `${type.toLowerCase()}${extension}`;

  const storagePath = `candidates/${candidateId}/${filename}`;

  await storage.save(storagePath, file.buffer);

  await pool.query(
    `INSERT INTO candidate_document (
      id,
      candidate_id,
      type,
      original_filename,
      storage_path,
      mime_type,
      size_bytes
    ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      documentId,
      candidateId,
      type,
      file.originalname,
      storagePath,
      file.mimetype,
      file.size,
    ],
  );

  return {
    id: documentId,
    candidate_id: candidateId,
    type,
    file: filename,
  };
};
