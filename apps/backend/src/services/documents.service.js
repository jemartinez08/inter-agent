const pool = require("../config/db");
const storage = require("../storage");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

exports.uploadCandidateDocument = async (candidateId, file, type) => {
  const documentId = uuidv4();

  // 1️⃣ Extensión original
  const extension = path.extname(file.originalname);

  // 2️⃣ Nombre de archivo fijo (recomendado)
  const filename = `document${extension}`;

  // 3️⃣ Path basado en documentId (NO candidateId)
  const storagePath = `documents/${documentId}/${filename}`;

  // 4️⃣ Guardar archivo
  await storage.save(storagePath, file.buffer);

  // 5️⃣ Persistir metadata
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
  };
};

exports.getDocumentForDownload = async (documentId) => {
  const [rows] = await pool.query(
    "SELECT * FROM candidate_document WHERE id = ?",
    [documentId],
  );

  if (rows.length === 0) return null;

  const document = rows[0];

  if (!document.storage_path) {
    throw new Error(`Document ${documentId} has no storage_path`);
  }

  const filePath = path.join(process.cwd(), "storage", document.storage_path);

  return {
    filePath,
    document,
  };
};
