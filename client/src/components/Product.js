import React from 'react';

const Product = ({ product }) => {
  return (
    <div className="product-card">
      <a href={`/product/${product._id}`}>
        <img src={product.image} alt={product.name} className="product-image" />
      </a>
      <div className="product-card-body">
        <a href={`/product/${product._id}`}>
          <h2>{product.name}</h2>
        </a>
        <p className="product-price">{product.price.toLocaleString('fr-FR')} FCFA</p>
      </div>
    </div>
  );
};

export default Product;