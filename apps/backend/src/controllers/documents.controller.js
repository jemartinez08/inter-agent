const service = require("../services/documents.service");

exports.uploadCandidateDocument = async (req, res) => {
  const { candidateId } = req.params;
  const { type } = req.body;
  const file = req.file;

  if (!file) {
    return res.status(400).json({ message: "File is required" });
  }

  if (!["CV", "INTERVIEW_TRANSCRIPT"].includes(type)) {
    return res.status(400).json({ message: "Invalid document type" });
  }

  const document = await service.uploadCandidateDocument(
    candidateId,
    file,
    type,
  );

  res.status(201).json(document);
};

exports.getCandidateDocuments = async (req, res) => {
  const documents = await service.getCandidateDocuments(req.params.id);
  res.json(documents);
};

exports.downloadDocument = async (req, res) => {
  const result = await service.getDocumentForDownload(req.params.documentId);

  if (!result) {
    return res.status(404).json({ message: "Document not found" });
  }

  const { filePath, document } = result;

  res.setHeader(
    "Content-Disposition",
    `attachment; filename="${document.original_name}"`,
  );
  res.setHeader("Content-Type", document.mime_type);

  res.sendFile(filePath);
};
