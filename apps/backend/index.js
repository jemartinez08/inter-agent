import express from "express";
import multer from "multer";
import cors from "cors";

const app = express();
const upload = multer({ storage: multer.memoryStorage() });
app.use(cors());

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.post("/api/automation", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "PDF required" });
    }

    // FormData nativo (Node 18+)
    const formData = new FormData();
    formData.append(
      "file",
      new Blob([req.file.buffer], { type: req.file.mimetype }),
      req.file.originalname
    );
    formData.append("action", req.body.action ?? "process_pdf");

    const response = await fetch('https://jemartinez.app.n8n.cloud/webhook-test/e3510cf8-ab93-4827-850e-d3a3b919d72c', {
      method: "POST",
      headers: {
        "X-Internal-Token": process.env.N8N_SECRET
        // NO setear Content-Type manualmente
      },
      body: formData
    });

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

app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});
