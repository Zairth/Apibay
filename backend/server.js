const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./src/routes/userRoutes');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Route de test
app.get('/', (req, res) => res.send('Backend is running!'));

// Routes users
app.use('/users', userRoutes);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
