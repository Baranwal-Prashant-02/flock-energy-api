require("dotenv").config();

const express = require("express");
const metersRouter = require("./routes/meters");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    name: "Flock Energy - Urja Meter Ops API",
    version: "1.0.0",
    endpoints: ["/api/v1/meters", "/health"],
  });
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/v1/meters", metersRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`API running at http://localhost:${port}`);
});