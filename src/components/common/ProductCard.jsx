// src/components/products/ProductCard.jsx
import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useCart } from '../../contexts/CartContext';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const { t } = useLanguage();
  const { addToCart, isInCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    addToCart(product, 1);
  };

  const handleViewDetails = () => {
    navigate(`/product/${product.id}`);
  };

  // Fonction de secours si isInCart n'existe pas
  const checkIfInCart = () => {
    try {
      // Essayer d'utiliser isInCart si elle existe
      return typeof isInCart === 'function' ? isInCart(product.id) : false;
    } catch (error) {
      console.error('Error checking cart:', error);
      return false;
    }
  };

  const productInCart = checkIfInCart();

  return (
    <div className="product-card">
      {/* IMAGE */}
      <div className="product-image">
        <img src={product.image} alt={product.name} />

        {product.featured && (
          <span className="badge featured">⭐ {t('featured')}</span>
        )}

        {product.bio && (
          <span className="badge bio">🌿 {t('bio')}</span>
        )}
      </div>

      {/* INFOS */}
      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="description">{product.description}</p>

        {/* NOTE */}
        {product.rating && (
          <div className="rating">
            {'★'.repeat(Math.floor(product.rating))}
            {'☆'.repeat(5 - Math.floor(product.rating))}
            <span> ({product.reviewCount})</span>
          </div>
        )}

        {/* PRIX */}
        <div className="price-section">
          <span className="price">{product.price.toFixed(2)} €</span>
          {product.originalPrice && (
            <span className="original-price">
              {product.originalPrice.toFixed(2)} €
            </span>
          )}
        </div>

        {/* ACTIONS */}
        <div className="product-actions">
          <button
            className={`btn-primary ${productInCart ? 'in-cart' : ''}`}
            onClick={handleAddToCart}
            disabled={productInCart}
          >
            {productInCart
              ? `✓ ${t('alreadyInCart')}`
              : t('addToCart')}
          </button>

          <button
            className="btn-secondary"
            onClick={handleViewDetails}
          >
            {t('details')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;