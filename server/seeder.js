import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import products from './data/products.js';
import Product from './models/productModel.js';

// On met la logique de connexion directement ici pour faciliter le débogage.

dotenv.config();

const importData = async () => {
  try {
    // ÉTAPE 1 : Vérifier si la variable MONGO_URI est chargée
    if (!process.env.MONGO_URI) {
      console.error('ERREUR : La variable MONGO_URI n\'est pas définie dans votre fichier .env'.red.bold);
      process.exit(1);
    }
    console.log('Variable MONGO_URI trouvée. Tentative de connexion...'.cyan);

    // ÉTAPE 2 : Se connecter à MongoDB
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connecté: ${conn.connection.host}`.cyan.underline);

    // ÉTAPE 3 : Supprimer les anciennes données
    console.log('Suppression des anciennes données...'.yellow);
    await Product.deleteMany();

    // ÉTAPE 4 : Insérer les nouvelles données
    console.log('Insertion des nouvelles données...'.yellow);
    await Product.insertMany(products);

    console.log('Données importées avec succès !'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`ERREUR lors du processus de seeding : ${error.message}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        await Product.deleteMany();
        console.log('Données détruites avec succès !'.red.inverse);
        process.exit();
    } catch (error) {
        console.error(`ERREUR lors de la destruction des données : ${error.message}`.red.inverse);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}