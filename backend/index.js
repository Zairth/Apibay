// backend/index.js
const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello from Railway! \n L'URL est PUBLIQUE et STATIQUE, elle ne changeera pas même si j'éteint mon PC");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
