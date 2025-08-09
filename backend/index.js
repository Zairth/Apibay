// backend/index.js
const express = require("express");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "..", "frontend", "src")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "src", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
