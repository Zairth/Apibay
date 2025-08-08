// backend/index.js
import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello from Railway!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
