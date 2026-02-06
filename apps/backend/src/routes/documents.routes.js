const express = require("express");
const controller = require("../controllers/documents.controller");
const upload = require("../middlewares/upload.middleware");

const router = express.Router();

router.post(
  "/candidates/:candidateId/documents",
  upload.single("file"),
  controller.uploadCandidateDocument,
);

module.exports = router;
