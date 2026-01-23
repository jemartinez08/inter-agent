const express = require("express");
const multer = require("multer");
const cors = require("cors");
const axios = require("axios");
const { extractTextFromPdf } = require("./utils/extractTextFromPdf.js");

const app = express();
const upload = multer({ storage: multer.memoryStorage() });
app.use(cors());

const PORT = process.env.PORT || 3001;

app.use(express.json());

// -------------------------
app.use((req, _res, next) => {
  console.log("Incoming:", req.method, req.url);
  next();
});

app.get("/api/health", (req, res) => {
  console.log("Received request for /api/health");
  res.json({ status: "ok" });
});

app.post("/api/automation", upload.single("file"), async (req, res) => {
  console.log("Received request for /api/automation");
  try {
    if (!req.file) {
      console.log("No file uploaded");
      return res.status(400).json({ error: "PDF required" });
    }

    // FormData nativo (Node 18+)
    const formData = new FormData();
    formData.append(
      "file",
      new Blob([req.file.buffer], { type: req.file.mimetype }),
      req.file.originalname,
    );
    formData.append("action", req.body.action ?? "process_pdf");

    const response = await fetch(
      "https://mvpcs.app.n8n.cloud/webhook/f0b70d5f-220d-4593-b3ba-670edcbdaab6",
      {
        method: "POST",
        headers: {
          // NO setear Content-Type manualmente
        },
        body: formData.get("file") ? formData : null,
      },
    );

    const contentType = response.headers.get("content-type") || "";

    const data = contentType.includes("application/json")
      ? await response.json()
      : await response.text();

    res.status(response.status).send(data);
  } catch (error) {
    console.error("Proxy error:", error);
    res.status(500).json({ error: "Proxy error" });
  }
});

// -------------------------
// Extract from PDF endpoint
app.post("/api/parse-cv", upload.single("cv"), async (req, res) => {
  console.log("Parsing CV PDF...");
  try {
    console.log("Received request for /api/parse-cv");
    if (!req.file) {
      return res.status(400).json({ error: "PDF file is required" });
    }

    const pdfBuffer = req.file.buffer;
    const extractedText = await extractTextFromPdf(pdfBuffer);

    // SALMA Request
    const apiUrl = process.env.API_URL;
    const token = process.env.API_BEARER_TOKEN;

    console.log(body);

    try {
      const response = await axios.post(apiUrl, body, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      throw {
        status: error.response?.status,
        message: error.response?.data || error.message,
      };
    }

    // Aquí ya puedes enviarlo a un LLM
    res.json({
      success: true,
      text: extractedText,
      length: extractedText.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});
