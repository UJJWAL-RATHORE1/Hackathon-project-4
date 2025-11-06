import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.json({
    message: "Drug Discovery API Server",
    version: "1.0.0",
    endpoints: {
      health: "GET /api/health",
      analyze: "POST /api/analyze",
      chat: "POST /api/chat",
    },
  });
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// Mock analyze endpoint
app.post("/api/analyze", async (req, res) => {
  const { drugName } = req.body || {};
  if (!drugName || typeof drugName !== "string") {
    return res.status(400).json({ error: "drugName is required" });
  }

  const normalized = drugName.toLowerCase().trim();

  // Special case for paracetamol
  if (normalized === "paracetamol" || normalized === "acetaminophen") {
    return res.json({
      drugName,
      newUse: "Chronic pain relief, Neuropsychological effects, Fever and inflammation modulation",
      confidence: 0.82,
      summary:
        "Chronic pain relief: Research needed on paracetamol's long-term effectiveness and liver safety in chronic conditions.\n\n" +
        "Neuropsychological effects: Emerging evidence links paracetamol to altered emotional responses—needs deeper study.\n\n" +
        "Fever and inflammation modulation: Mechanism of action in fever control and anti-inflammatory limits remain unclear.",
      sources: [
        { title: "Paracetamol and chronic pain management", url: "https://pubmed.ncbi.nlm.nih.gov/chronic-pain" },
        { title: "Neuropsychological impact of acetaminophen", url: "https://pubmed.ncbi.nlm.nih.gov/neuro-effects" },
        { title: "Fever modulation mechanisms", url: "https://pubmed.ncbi.nlm.nih.gov/fever-control" },
      ],
    });
  }

  // Default mocked analysis result for other drugs
  const result = {
    drugName,
    newUse: `${drugName} potential for anti-inflammatory applications`,
    confidence: 0.78,
    summary:
      `Preliminary literature suggests ${drugName} may modulate pathways relevant to inflammation. Further clinical validation is required.`,
    sources: [
      { title: `Review on ${drugName} mechanisms`, url: "https://example.com/review" },
      { title: `${drugName} trial phase II`, url: "https://example.com/trial" },
    ],
  };

  res.json(result);
});

// Mock chat endpoint
app.post("/api/chat", async (req, res) => {
  const { message, context } = req.body || {};
  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "message is required" });
  }
  const reply = `You asked: "${message}"${context ? ` (context: ${context})` : ""}. Here's a brief, non-clinical summary based on mock data.`;
  res.json({ reply });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`API server listening on http://localhost:${PORT}`);
});



