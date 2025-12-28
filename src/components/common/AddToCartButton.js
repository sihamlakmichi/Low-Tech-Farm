// src/components/common/AddToCartButton.js
import React, { useState } from 'react';
import { FaShoppingCart, FaCheck, FaPlus, FaMinus } from 'react-icons/fa';
import { useCart } from '../../contexts/CartContext';

const AddToCartButton = ({ product, className = '', showQuantity = false }) => {
  const { addToCart, isInCart, getProductQuantity, updateQuantity } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const isProductInCart = isInCart(product.id);
  const cartQuantity = getProductQuantity(product.id);

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product, quantity);
    
    // Animation de confirmation
    setTimeout(() => {
      setIsAdding(false);
    }, 1000);
  };

  const handleQuantityChange = (value) => {
    const newQuantity = Math.max(1, Math.min(product.maxQuantity || 99, quantity + value));
    setQuantity(newQuantity);
  };

  if (showQuantity && isProductInCart) {
    return (
      <div className={`quantity-selector ${className}`}>
        <button 
          className="quantity-btn"
          onClick={() => updateQuantity(product.id, cartQuantity - 1)}
        >
          <FaMinus />
        </button>
        <span className="quantity-value">{cartQuantity} dans le panier</span>
        <button 
          className="quantity-btn"
          onClick={() => updateQuantity(product.id, cartQuantity + 1)}
          disabled={cartQuantity >= (product.maxQuantity || 99)}
        >
          <FaPlus />
        </button>
      </div>
    );
  }

  return (
    <div className={`add-to-cart-wrapper ${className}`}>
      {showQuantity && (
        <div className="quantity-control">
          <button 
            className="quantity-btn"
            onClick={() => handleQuantityChange(-1)}
            disabled={quantity <= 1}
          >
            <FaMinus />
          </button>
          <input 
            type="number"
            min="1"
            max={product.maxQuantity || 99}
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
            className="quantity-input"
          />
          <button 
            className="quantity-btn"
            onClick={() => handleQuantityChange(1)}
            disabled={quantity >= (product.maxQuantity || 99)}
          >
            <FaPlus />
          </button>
        </div>
      )}
      
      <button
        className={`add-to-cart-btn ${isProductInCart ? 'in-cart' : ''} ${isAdding ? 'adding' : ''}`}
        onClick={handleAddToCart}
        disabled={isAdding}
      >
        {isAdding ? (
          <FaCheck className="btn-icon" />
        ) : (
          <FaShoppingCart className="btn-icon" />
        )}
        <span className="btn-text">
          {isProductInCart ? 'Déjà au panier' : 'Ajouter au panier'}
        </span>
      </button>

      <style jsx>{`
        .add-to-cart-wrapper {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .quantity-control {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .quantity-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 2px solid #e0e0e0;
          background: white;
          color: #333;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .quantity-btn:hover:not(:disabled) {
          border-color: #FFCE00;
          background: #FFCE00;
          color: white;
        }

        .quantity-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .quantity-input {
          width: 60px;
          text-align: center;
          padding: 8px;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
        }

        .quantity-input:focus {
          outline: none;
          border-color: #FFCE00;
        }

        .add-to-cart-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          background: linear-gradient(135deg, #FFCE00 0%, #ffb300 100%);
          color: white;
          border: none;
          padding: 12px 20px;
          border-radius: 12px;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .add-to-cart-btn:hover:not(:disabled) {
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(255, 206, 0, 0.3);
        }

        .add-to-cart-btn.in-cart {
          background: linear-gradient(135deg, #00a859 0%, #008548 100%);
        }

        .add-to-cart-btn.adding {
          background: linear-gradient(135deg, #00a859 0%, #008548 100%);
        }

        .add-to-cart-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        .btn-icon {
          font-size: 1.2rem;
          transition: transform 0.3s ease;
        }

        .add-to-cart-btn.adding .btn-icon {
          animation: spin 0.5s ease;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .btn-text {
          flex: 1;
          text-align: center;
        }

        .quantity-selector {
          display: flex;
          align-items: center;
          gap: 15px;
          background: #f8f9fa;
          padding: 12px 20px;
          border-radius: 12px;
          border: 2px solid #e0e0e0;
        }

        .quantity-selector .quantity-value {
          font-weight: 600;
          color: #333;
          min-width: 140px;
          text-align: center;
        }
      `}</style>
    </div>
  );
};

export default AddToCartButton;