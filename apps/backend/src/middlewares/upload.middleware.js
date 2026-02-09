const multer = require("multer");
const path = require("path");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB
  },
  fileFilter: (_req, file, cb) => {
    const allowedMimeTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
      "application/octet-stream", // ← clave
    ];

    const allowedExtensions = [".pdf", ".doc", ".docx", ".txt"];

    const ext = path.extname(file.originalname).toLowerCase();

    if (
      allowedMimeTypes.includes(file.mimetype) &&
      allowedExtensions.includes(ext)
    ) {
      return cb(null, true);
    }

    cb(
      new Error(
        `Invalid file type. mime=${file.mimetype}, ext=${ext}`
      )
    );
  },
});

module.exports = upload;
