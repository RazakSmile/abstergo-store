import mongoose from 'mongoose';

// Basé sur le Cahier des Charges Fonctionnel, section Fiches produits détaillées
const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true },        // Titre clair
    image: { type: String, required: true },       // Galerie d'images
    brand: { type: String, required: true },       // Filtre par marque
    category: { type: String, required: true },    // Menu par catégories
    description: { type: String, required: true }, // Description commerciale
    specs: { type: String, required: true },       // Fiche technique complète
    rating: { type: Number, required: true, default: 0 },    // Avis et notation
    numReviews: { type: Number, required: true, default: 0 },// Nombre d'avis
    price: { type: Number, required: true, default: 0 },     // Prix
    countInStock: { type: Number, required: true, default: 0 }, // Statut du stock
    warranty: { type: String, required: true, default: '1 an' } // Garantie
  },
  {
    // Ajoute automatiquement les champs createdAt et updatedAt
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
