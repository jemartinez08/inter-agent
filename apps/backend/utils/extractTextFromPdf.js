const pdfParse = require("pdf-parse");

/**
 * Extrae texto plano desde un PDF
 */
async function extractTextFromPdf(pdfBuffer) {
  if (!pdfBuffer) {
    throw new Error("PDF buffer is required");
  }

  try {
    const data = await pdfParse(pdfBuffer);

    let text = data.text || "";

    text = text
      .replace(/\r\n/g, "\n")
      .replace(/\n{2,}/g, "\n")
      .replace(/[ \t]{2,}/g, " ")
      .trim();

    return text;
  } catch (error) {
    throw new Error(`Error extracting PDF text: ${error.message}`);
  }
}

module.exports = { extractTextFromPdf };
