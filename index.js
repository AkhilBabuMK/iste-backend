const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Load members.json once into memory (very fast)
let members = [];
try {
  const data = fs.readFileSync("members.json", "utf8");
  members = JSON.parse(data);
  console.log(`Loaded ${members.length} member IDs`);
} catch (err) {
  console.error("Error loading members.json:", err);
}

// API endpoint: /check?id=ISTE001
app.get("/check", (req, res) => {
  const queryId = (req.query.id || "").trim();

  if (!queryId) {
    return res.json({ valid: false });
  }

  const isValid = members.includes(queryId);
  return res.json({ valid: isValid });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
