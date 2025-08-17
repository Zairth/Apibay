import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "..", "frontend", "src")));
app.use(express.json());


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "src", "index.html"));
});

// ==============================
// Route pour créer un User
// ==============================
app.post("/users", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: "username, email et password sont requis" });
    }

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password,
      },
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la création de l'utilisateur" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
