require('dotenv').config();
const express = require('express');
const { Sequelize } = require('sequelize');

const app = express();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_CONNECTION,
    logging: false,
  }
);

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('Connexion à la base MySQL réussie !');

    // Ici tu peux mettre d’autres initialisations, middlewares Express etc.

    app.get('/', (req, res) => {
      res.send('Hello World depuis Express + MySQL !');
    });

    app.listen(process.env.PORT, () => {
      console.log(`Serveur http://localhost:${process.env.PORT} réussi !`);
    });
  } catch (error) {
    console.error('Erreur de connexion à la base:', error);
    process.exit(1);
  }
}

startServer();
