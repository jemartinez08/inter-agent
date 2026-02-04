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
  try {
    const role = req.body.role;

    console.log("Received request for /api/automation with role:", role);

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
    if (role) {
      formData.append("role", role);
    }

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

    let data;
    if (contentType.includes("application/json")) {
      const text = await response.text();
      data = text ? JSON.parse(text) : { status: "success" };
    } else {
      data = await response.text();
    }

    console.log("📤 Response from n8n:", data);

    res.json({
      success: true,
      role: role,
      response: data
    });
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
    const role = req.body.role;

    console.log("📋 Role recibido:", role);
    console.log("📄 Archivo PDF:", req.file.originalname);

    const extractedText = await extractTextFromPdf(pdfBuffer);

    // SALMA Request
    const apiUrl = process.env.API_URL;
    const token = process.env.API_BEARER_TOKEN;

    res.json({
      success: true,
      text: extractedText,
      role: role,
    });

    // api request
    // try {
    //   const response = await axios.post(apiUrl, body, {
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${token}`,
    //     },
    //   }); 

    //   // Aquí ya puedes enviarlo a un LLM
    //   res.json({
    //     success: true,
    //   });
    // } catch (error) { 
    //   throw {
    //     status: error.response?.status,
    //     message: error.response?.data || error.message,
    //   };
    // }
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
