const express = require("express");
const controller = require("../controllers/documents.controller");
const upload = require("../middlewares/upload.middleware");

const router = express.Router();

router.get("/candidates/:id/documents", controller.getCandidateDocuments);

router.post(
  "/candidates/:candidateId/documents",
  upload.single("file"),
  controller.uploadCandidateDocument,
);

router.get("/documents/:documentId/download", controller.downloadDocument);

module.exports = router;
