// src/components/products/ProductCard.jsx
import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

const ProductCard = ({ product }) => {
  const { t } = useLanguage();

  const handleAddToCart = () => {
    console.log('Produit ajouté:', product);
    // Logique d'ajout au panier
  };

  const handleViewDetails = () => {
    console.log('Détails produit:', product);
    // Navigation vers page détails
  };

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
        {product.featured && <span className="badge featured">⭐ Vedette</span>}
        {product.bio && <span className="badge bio">🌿 Bio</span>}
      </div>
      
      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="description">{product.description}</p>
        
        <div className="product-meta">
          {product.rating && (
            <div className="rating">
              {'★'.repeat(Math.floor(product.rating))}
              {'☆'.repeat(5 - Math.floor(product.rating))}
              <span>({product.reviewCount})</span>
            </div>
          )}
        </div>
        
        <div className="price-section">
          <span className="price">{product.price}</span>
          {product.originalPrice && (
            <span className="original-price">{product.originalPrice}</span>
          )}
        </div>
        
        <div className="product-actions">
          <button className="btn-primary" onClick={handleAddToCart}>
            Ajouter au panier
          </button>
          <button className="btn-secondary" onClick={handleViewDetails}>
            Détails
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;