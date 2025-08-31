import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Product from '../components/Product'; // Importez le nouveau composant

const HomeScreen = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Grâce au proxy, on peut utiliser une URL relative
        const { data } = await axios.get('/api/products');
        setProducts(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des produits:", error);
        // Ici, vous pourriez ajouter un état pour afficher un message d'erreur à l'utilisateur
      }
    };
    fetchProducts();
  }, []); // Le tableau vide signifie que cet effet s'exécute une seule fois, au montage du composant

  return (
    <div>
      <h1>Nos Derniers Produits</h1>
      <div className="products-grid">
        {products.map(product => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default HomeScreen;
