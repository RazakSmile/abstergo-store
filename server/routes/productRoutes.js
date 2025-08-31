import express from 'express';
import Product from '../models/productModel.js';

const router = express.Router();

// =================================================================
// @desc    Récupérer tous les produits
// @route   GET /api/products
// @access  Public
// =================================================================
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
});

// =================================================================
// @desc    Récupérer UN SEUL produit par son ID
// @route   GET /api/products/:id
// @access  Public
// =================================================================
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: 'Produit non trouvé' });
    }
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
});

// =================================================================
// @desc    Créer un nouveau produit
// @route   POST /api/products
// @access  Privé/Admin
// =================================================================
router.post('/', async (req, res) => {
  try {
    const { name, image, brand, category, description, price, countInStock, specs, warranty } = req.body;

    const product = new Product({
      name,
      image,
      brand,
      category,
      description,
      price,
      countInStock,
      specs,
      warranty
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la création du produit", error: error.message });
  }
});

// =================================================================
// @desc    Mettre à jour un produit
// @route   PUT /api/products/:id
// @access  Privé/Admin
// =================================================================
router.put('/:id', async (req, res) => {
  try {
    const { name, image, brand, category, description, price, countInStock, specs, warranty } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = name || product.name;
      product.image = image || product.image;
      product.brand = brand || product.brand;
      product.category = category || product.category;
      product.description = description || product.description;
      product.price = price !== undefined ? price : product.price;
      product.countInStock = countInStock !== undefined ? countInStock : product.countInStock;
      product.specs = specs || product.specs;
      product.warranty = warranty || product.warranty;

      const updatedProduct = await product.save();
      res.status(200).json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Produit non trouvé' });
    }
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour du produit", error: error.message });
  }
});

// =================================================================
// @desc    Supprimer un produit
// @route   DELETE /api/products/:id
// @access  Privé/Admin
// =================================================================
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await product.deleteOne();
      res.status(200).json({ message: 'Produit supprimé avec succès' });
    } else {
      res.status(404).json({ message: 'Produit non trouvé' });
    }
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression du produit", error: error.message });
  }
});

export default router;
