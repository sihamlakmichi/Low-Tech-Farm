// src/components/common/FloatingCart.js
import React, { useEffect } from 'react';
import Panier from '../../pages/Panier';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../../contexts/CartContext';

const FloatingCart = () => {
  const { isCartOpen, setIsCartOpen, cartItemCount, openCart, closeCart } = useCart();

  // Empêcher le scroll du body quand le modal est ouvert
  useEffect(() => {
    if (isCartOpen) {
      // Sauvegarder la position de scroll actuelle
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      
      return () => {
        // Restaurer le scroll quand le modal se ferme
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [isCartOpen]);

  // Gestion de la touche Échap
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isCartOpen) {
        closeCart();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isCartOpen, closeCart]);

  // Fonction pour fermer le modal en cliquant sur l'overlay
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeCart();
    }
  };

  // Fonction pour fermer le modal
  const handleCloseCart = () => {
    closeCart();
  };

  return (
    <>
      {/* Bouton panier flottant en cercle */}
      <div 
        className="floating-cart-button" 
        onClick={openCart}
        role="button"
        tabIndex={0}
        onKeyPress={(e) => e.key === 'Enter' && openCart()}
        aria-label={`Ouvrir le panier (${cartItemCount} articles)`}
      >
        <FaShoppingCart className="cart-button-icon" />
        {cartItemCount > 0 && (
          <span className="cart-button-badge">{cartItemCount}</span>
        )}
      </div>

      {/* Overlay */}
      <div 
        className={`cart-floating-overlay ${isCartOpen ? 'active' : ''}`}
        onClick={handleOverlayClick}
        role="presentation"
      />

      {/* Modal du panier */}
      <div className={`cart-floating-modal ${isCartOpen ? 'active' : ''}`}>
        <div className="cart-modal-content">
          <Panier isModal={true} onClose={handleCloseCart} />
        </div>
      </div>

      <style jsx>{`
        .floating-cart-button {
          position: fixed;
          bottom: 30px;
          right: 30px;
          width: 70px;
          height: 70px;
          background: linear-gradient(135deg, #FFCE00 0%, #ffb300 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 8px 25px rgba(255, 206, 0, 0.4);
          z-index: 1000;
          transition: all 0.3s ease;
          border: 4px solid white;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% {
            box-shadow: 0 8px 25px rgba(255, 206, 0, 0.4);
          }
          50% {
            box-shadow: 0 8px 35px rgba(255, 206, 0, 0.7);
          }
          100% {
            box-shadow: 0 8px 25px rgba(255, 206, 0, 0.4);
          }
        }

        .floating-cart-button:hover {
          transform: scale(1.1) rotate(10deg);
          box-shadow: 0 12px 35px rgba(255, 206, 0, 0.6);
          animation: none;
        }

        .cart-button-icon {
          color: white;
          font-size: 28px;
          transition: transform 0.3s ease;
        }

        .floating-cart-button:hover .cart-button-icon {
          transform: scale(1.1);
        }

        .cart-button-badge {
          position: absolute;
          top: -5px;
          right: -5px;
          background: #ff4757;
          color: white;
          border-radius: 50%;
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.9rem;
          font-weight: bold;
          box-shadow: 0 3px 8px rgba(0, 0, 0, 0.3);
          border: 2px solid white;
          animation: badgePulse 1.5s infinite;
        }

        @keyframes badgePulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }

        .cart-floating-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          z-index: 1001;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .cart-floating-overlay.active {
          opacity: 1;
          visibility: visible;
        }

        .cart-floating-modal {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) scale(0.8);
          width: 90%;
          max-width: 500px;
          max-height: 80vh;
          background: white;
          border-radius: 20px;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
          z-index: 1002;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
          overflow: hidden;
        }

        .cart-floating-modal.active {
          opacity: 1;
          visibility: visible;
          transform: translate(-50%, -50%) scale(1);
        }

        .cart-modal-content {
          height: 100%;
          overflow-y: auto;
        }

        @media (max-width: 768px) {
          .floating-cart-button {
            width: 60px;
            height: 60px;
            bottom: 20px;
            right: 20px;
            border-width: 3px;
          }

          .cart-button-icon {
            font-size: 24px;
          }

          .cart-button-badge {
            width: 24px;
            height: 24px;
            font-size: 0.8rem;
          }

          .cart-floating-modal {
            width: 95%;
            max-height: 85vh;
          }
        }

        @media (max-width: 480px) {
          .floating-cart-button {
            width: 55px;
            height: 55px;
            bottom: 15px;
            right: 15px;
          }

          .cart-button-icon {
            font-size: 22px;
          }
        }
      `}</style>
    </>
  );
};

export default FloatingCart;