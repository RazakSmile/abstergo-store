import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import colors from 'colors'; // On importe colors pour les logs
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5001;

// On crée une fonction pour démarrer le serveur
const startServer = async () => {
  try {
    // 1. On attend que la connexion à la DB soit réussie
    await connectDB();

    // 2. Si la connexion est OK, on démarre le serveur Express
    app.listen(PORT, () => {
      console.log(
        `Serveur démarré en mode ${process.env.NODE_ENV} sur le port ${PORT}`.yellow.bold
      );
    });
  } catch (error) {
    // Si la connexion échoue, on affiche l'erreur et on arrête tout
    console.error(`ERREUR: Impossible de démarrer le serveur`.red.bold);
    console.error(error);
    process.exit(1);
  }
};

// On appelle la fonction pour tout lancer
startServer();