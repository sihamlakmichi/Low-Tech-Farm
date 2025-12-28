// src/components/products/ProductList.jsx
import React from 'react';
import ProductCard from './ProductCard';
import { useProducts } from '../../hooks/useProducts';

const ProductList = ({ category = "all", limit = null }) => {
  const { products, loading, error } = useProducts(category, limit);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Chargement des produits...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>❌ {error}</p>
        <button onClick={() => window.location.reload()}>
          Réessayer
        </button>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="empty-container">
        <p>Aucun produit trouvé.</p>
      </div>
    );
  }

  return (
    <div className="product-list">
      {products.map(product => (
        <ProductCard
          key={`${product.category}-${product.id}`}
          product={product}
        />
      ))}
    </div>
  );
};

export default ProductList;
