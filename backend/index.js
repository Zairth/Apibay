const express = require('express');
const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client');

dotenv.config();
const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => res.send('Backend is running!'));

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
