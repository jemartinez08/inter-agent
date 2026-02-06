const service = require('../services/documents.service');

exports.uploadCandidateDocument = async (req, res) => {
  const { candidateId } = req.params;
  const { type } = req.body;
  const file = req.file;

  if (!file) {
    return res.status(400).json({ message: 'File is required' });
  }

  if (!['CV', 'INTERVIEW_TRANSCRIPT'].includes(type)) {
    return res.status(400).json({ message: 'Invalid document type' });
  }

  const document = await service.uploadCandidateDocument(
    candidateId,
    file,
    type
  );

  res.status(201).json(document);
};
