import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { useCart } from '../../contexts/CartContext'; // IMPORTEZ useCart
import { 
  FaHome, 
  FaBook, 
  FaBox, 
  FaLeaf, 
  FaWineBottle, 
  FaSeedling, 
  FaEnvelope,
  FaBars,
  FaTimes,
  FaShoppingCart
} from 'react-icons/fa';

const Navigation = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // UTILISEZ LE CONTEXTE DU PANIER GLOBAL
  const { cartItemCount } = useCart();

  // Fonction pour vérifier si le lien est actif
  const isActive = (path) => {
    const currentPath = location.pathname;
    
    if (path === '/') {
      return currentPath === '/';
    }
    
    if (path === '/cart') {
      return currentPath === '/cart' || currentPath.startsWith('/cart/');
    }
    
    if (path === '/catalogue') {
      return currentPath === '/catalogue' || currentPath.startsWith('/catalogue/');
    }
    
    return currentPath === path || currentPath.startsWith(`${path}/`);
  };

  // Fonction pour fermer le menu
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  const menuItems = [
    { 
      path: '/', 
      label: t('home') || 'Accueil', 
      icon: <FaHome className="nav-icon-svg" /> 
    },
    { 
      path: '/catalogue', 
      label: t('catalogue') || 'Catalogue', 
      icon: <FaBook className="nav-icon-svg" /> 
    },
    { 
      path: '/products', 
      label: t('products') || 'Produits', 
      icon: <FaBox className="nav-icon-svg" /> 
    },
    { 
      path: '/olive-oil', 
      label: t('oliveOil') || 'Huile d\'olive', 
      icon: <FaLeaf className="nav-icon-svg" /> 
    },
    { 
      path: '/honey', 
      label: t('honey') || 'Miels', 
      icon: <FaWineBottle className="nav-icon-svg" /> 
    },
    { 
      path: '/tea', 
      label: t('tea') || 'Thé', 
      icon: <FaSeedling className="nav-icon-svg" /> 
    },
    { 
      path: '/contact', 
      label: t('contact') || 'Contact', 
      icon: <FaEnvelope className="nav-icon-svg" /> 
    }
  ];

  return (
    <>
      <nav className="main-nav">
        <div className="nav-container">
          {/* Menu hamburger pour mobile */}
          <button 
            className="hamburger-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
            aria-expanded={isMenuOpen}
          >
            <FaBars className="hamburger-icon" />
          </button>

          {/* Logo/Brand - Optionnel */}
          <div className="nav-brand">
            <Link to="/" className="brand-link">
              <span className="brand-text">Apiculture</span>
            </Link>
          </div>

          {/* Navigation desktop */}
          <ul className="nav-links">
            {menuItems.map((item) => (
              <li key={item.path} className="nav-item">
                <Link 
                  to={item.path} 
                  className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-label">{item.label}</span>
                </Link>
              </li>
            ))}
            
            {/* Lien panier desktop - Avec le compteur global */}
            <li className="nav-item cart-item-desktop">
              <Link 
                to="/cart" 
                className={`nav-link ${isActive('/cart') ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="nav-icon cart-icon-wrapper">
                  <FaShoppingCart className="nav-icon-svg cart-icon" />
                  {cartItemCount > 0 && (
                    <span className="cart-badge">{cartItemCount > 99 ? '99+' : cartItemCount}</span>
                  )}
                </span>
                <span className="nav-label">Panier</span>
              </Link>
            </li>
          </ul>

          {/* Panier mobile - version compacte */}
          <div className="mobile-cart-container">
            <Link 
              to="/cart" 
              className="mobile-cart-link"
              onClick={() => setIsMenuOpen(false)}
            >
              <FaShoppingCart className="mobile-cart-icon" />
              {cartItemCount > 0 && (
                <span className="mobile-cart-badge-mini">{cartItemCount > 9 ? '9+' : cartItemCount}</span>
              )}
            </Link>
          </div>
        </div>
      </nav>

      {/* Overlay pour menu mobile */}
      <div 
        className={`mobile-menu-overlay ${isMenuOpen ? 'active' : ''}`} 
        onClick={() => setIsMenuOpen(false)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && setIsMenuOpen(false)}
        aria-label="Fermer le menu"
      ></div>
      
      {/* Menu mobile */}
      <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
        <div className="mobile-menu-header">
          <div className="mobile-menu-title">
            <h3>Menu</h3>
            <div className="cart-count-mobile">
              <FaShoppingCart className="cart-icon-mobile" />
              {cartItemCount > 0 && (
                <span className="cart-count-badge-mobile">{cartItemCount}</span>
              )}
            </div>
          </div>
          <button 
            className="close-btn"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Fermer le menu"
          >
            <FaTimes className="close-icon" />
          </button>
        </div>
        
        <ul className="mobile-nav-links">
          {menuItems.map((item) => (
            <li key={item.path} className="mobile-nav-item">
              <Link 
                to={item.path} 
                className={`mobile-nav-link ${isActive(item.path) ? 'active' : ''}`}
                onClick={handleLinkClick}
              >
                <span className="mobile-nav-icon">{item.icon}</span>
                <span className="mobile-nav-label">{item.label}</span>
                {isActive(item.path) && <span className="active-indicator"></span>}
              </Link>
            </li>
          ))}
          
          {/* Panier dans le menu mobile */}
          <li className="mobile-nav-item cart-item-mobile">
            <Link 
              to="/cart" 
              className={`mobile-nav-link ${isActive('/cart') ? 'active' : ''}`}
              onClick={handleLinkClick}
            >
              <span className="mobile-nav-icon cart-icon-wrapper">
                <FaShoppingCart className="mobile-nav-icon-svg" />
                {cartItemCount > 0 && (
                  <span className="mobile-cart-badge">{cartItemCount > 99 ? '99+' : cartItemCount}</span>
                )}
              </span>
              <span className="mobile-nav-label">Panier</span>
              {isActive('/cart') && <span className="active-indicator"></span>}
              <span className="cart-count-text">
                {cartItemCount === 0 ? 'Vide' : `${cartItemCount} article${cartItemCount > 1 ? 's' : ''}`}
              </span>
            </Link>
          </li>
        </ul>
      </div>

      <style jsx>{`
        /* Variables */
        :root {
          --primary-color: #FFCE00;
          --primary-dark: #ffb300;
          --secondary-color: #1a1a1a;
          --background-dark: #2d2d2d;
          --background-darker: #1a1a1a;
          --text-light: #ffffff;
          --text-gray: #e0e0e0;
          --danger-color: #ff4757;
          --danger-dark: #ff3342;
          --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.2);
          --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.3);
          --shadow-lg: 0 8px 30px rgba(0, 0, 0, 0.4);
          --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .main-nav {
          background: linear-gradient(135deg, var(--background-darker) 0%, var(--background-dark) 100%);
          border-bottom: 3px solid var(--primary-color);
          box-shadow: var(--shadow-lg);
          position: sticky;
          top: 0;
          z-index: 1000;
        }

        .nav-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 40px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 70px;
        }

        /* Brand/Logo */
        .nav-brand {
          display: none;
        }

        /* Bouton hamburger */
        .hamburger-btn {
          display: none;
          background: none;
          border: none;
          color: var(--text-light);
          cursor: pointer;
          padding: 12px;
          border-radius: 8px;
          transition: var(--transition);
          z-index: 1001;
        }

        .hamburger-btn:hover,
        .hamburger-btn:focus {
          background: rgba(255, 255, 255, 0.15);
          outline: none;
        }

        .hamburger-btn[aria-expanded="true"] {
          background: rgba(255, 206, 0, 0.2);
        }

        .hamburger-icon {
          width: 24px;
          height: 24px;
        }

        /* Navigation desktop */
        .nav-links {
          display: flex;
          list-style: none;
          margin: 0;
          padding: 0;
          gap: 15px;
          align-items: center;
          justify-content: center;
          flex: 1;
        }

        .nav-item {
          position: relative;
        }

        .nav-link {
          display: flex;
          align-items: center;
          gap: 10px;
          color: var(--text-light);
          text-decoration: none;
          padding: 12px 18px;
          border-radius: 10px;
          transition: var(--transition);
          font-weight: 500;
          font-size: 1rem;
          border: 2px solid transparent;
          position: relative;
          overflow: hidden;
        }

        .nav-link:before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
          transition: left 0.5s ease;
        }

        .nav-link:hover:before {
          left: 100%;
        }

        .nav-link:hover {
          background: rgba(255, 255, 255, 0.12);
          color: var(--primary-color);
          transform: translateY(-2px);
          box-shadow: var(--shadow-sm);
        }

        .nav-link.active {
          background: rgba(255, 206, 0, 0.18);
          color: var(--primary-color);
          font-weight: 600;
          border-color: var(--primary-color);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(255, 206, 0, 0.2);
        }

        .nav-link.active:after {
          content: '';
          position: absolute;
          bottom: -3px;
          left: 50%;
          transform: translateX(-50%);
          width: 6px;
          height: 6px;
          background: var(--primary-color);
          border-radius: 50%;
        }

        .nav-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 20px;
          height: 20px;
          flex-shrink: 0;
        }

        .nav-icon-svg {
          width: 100% !important;
          height: 100% !important;
          display: block !important;
          color: inherit;
          transition: var(--transition);
        }

        .nav-link:hover .nav-icon-svg {
          transform: scale(1.1);
        }

        .nav-label {
          white-space: nowrap;
          font-size: 0.95rem;
          letter-spacing: 0.3px;
        }

        /* Panier desktop */
        .cart-item-desktop {
          margin-left: 10px;
        }

        .cart-icon-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .cart-icon {
          width: 22px;
          height: 22px;
        }

        .cart-badge {
          position: absolute;
          top: -8px;
          right: -8px;
          background: var(--danger-color);
          color: var(--text-light);
          border-radius: 50%;
          width: 22px;
          height: 22px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          font-weight: bold;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
          border: 2px solid var(--background-darker);
          animation: badgePulse 2s infinite;
          z-index: 1;
        }

        @keyframes badgePulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
          }
          50% {
            transform: scale(1.1);
            box-shadow: 0 4px 12px rgba(255, 71, 87, 0.4);
          }
        }

        .cart-item-desktop .nav-link:hover .cart-badge {
          background: var(--danger-dark);
          animation: none;
          transform: scale(1.1);
        }

        /* Panier mobile compact */
        .mobile-cart-container {
          display: none;
        }

        /* Overlay mobile */
        .mobile-menu-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(4px);
          z-index: 999;
          opacity: 0;
          visibility: hidden;
          transition: var(--transition);
        }

        .mobile-menu-overlay.active {
          opacity: 1;
          visibility: visible;
        }

        /* Menu mobile */
        .mobile-menu {
          position: fixed;
          top: 0;
          right: -100%;
          width: 320px;
          height: 100vh;
          background: var(--background-darker);
          z-index: 1000;
          transition: right 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: -5px 0 30px rgba(0, 0, 0, 0.5);
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .mobile-menu.active {
          right: 0;
        }

        .mobile-menu-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 25px;
          border-bottom: 2px solid rgba(255, 206, 0, 0.3);
          background: rgba(0, 0, 0, 0.3);
          position: relative;
        }

        .mobile-menu-title {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .mobile-menu-header h3 {
          color: var(--primary-color);
          margin: 0;
          font-size: 1.6rem;
          font-weight: 700;
        }

        .cart-count-mobile {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .cart-icon-mobile {
          color: var(--text-light);
          font-size: 1.4rem;
        }

        .cart-count-badge-mobile {
          position: absolute;
          top: -5px;
          right: -5px;
          background: var(--danger-color);
          color: var(--text-light);
          border-radius: 50%;
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.7rem;
          font-weight: bold;
          border: 2px solid var(--background-darker);
        }

        .close-btn {
          background: none;
          border: none;
          color: var(--text-light);
          cursor: pointer;
          padding: 10px;
          border-radius: 8px;
          transition: var(--transition);
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
        }

        .close-btn:hover,
        .close-btn:focus {
          background: rgba(255, 255, 255, 0.15);
          color: var(--primary-color);
          transform: rotate(90deg);
          outline: none;
        }

        .close-icon {
          width: 22px;
          height: 22px;
        }

        /* Liens menu mobile */
        .mobile-nav-links {
          list-style: none;
          margin: 0;
          padding: 25px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          flex: 1;
          overflow-y: auto;
          scrollbar-width: thin;
          scrollbar-color: var(--primary-color) transparent;
        }

        .mobile-nav-links::-webkit-scrollbar {
          width: 6px;
        }

        .mobile-nav-links::-webkit-scrollbar-track {
          background: transparent;
        }

        .mobile-nav-links::-webkit-scrollbar-thumb {
          background: var(--primary-color);
          border-radius: 3px;
        }

        .mobile-nav-item {
          border-radius: 10px;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.05);
          transition: var(--transition);
        }

        .mobile-nav-item:hover {
          background: rgba(255, 255, 255, 0.08);
          transform: translateX(5px);
        }

        .mobile-nav-link {
          display: flex;
          align-items: center;
          gap: 16px;
          color: var(--text-light);
          text-decoration: none;
          padding: 18px 22px;
          border-radius: 10px;
          transition: var(--transition);
          font-size: 1.1rem;
          border: 2px solid transparent;
          position: relative;
        }

        .mobile-nav-link.active {
          background: rgba(255, 206, 0, 0.18);
          color: var(--primary-color);
          font-weight: 600;
          border-color: var(--primary-color);
        }

        .mobile-nav-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          flex-shrink: 0;
          position: relative;
        }

        .mobile-nav-icon > svg,
        .mobile-nav-icon-svg {
          width: 100% !important;
          height: 100% !important;
          display: block !important;
          color: inherit;
        }

        .mobile-nav-label {
          flex: 1;
          font-size: 1.05rem;
        }

        .active-indicator {
          width: 8px;
          height: 8px;
          background: var(--primary-color);
          border-radius: 50%;
          margin-left: 10px;
          animation: pulse 2s infinite;
        }

        /* Panier menu mobile */
        .cart-item-mobile {
          margin-top: auto;
          background: rgba(255, 206, 0, 0.1);
          border: 1px solid rgba(255, 206, 0, 0.2);
        }

        .cart-item-mobile .mobile-nav-link {
          padding: 20px 22px;
        }

        .mobile-cart-badge {
          position: absolute;
          top: -8px;
          right: -8px;
          background: var(--danger-color);
          color: var(--text-light);
          border-radius: 50%;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
          font-weight: bold;
          border: 2px solid var(--background-darker);
        }

        .cart-count-text {
          font-size: 0.9rem;
          color: var(--text-gray);
          margin-left: 10px;
          font-weight: 500;
        }

        .cart-item-mobile .mobile-nav-link.active .cart-count-text {
          color: var(--primary-color);
          opacity: 0.9;
        }

        /* Responsive */
        @media (max-width: 1200px) {
          .nav-container {
            padding: 0 30px;
          }
          
          .nav-links {
            gap: 12px;
          }
          
          .nav-link {
            padding: 10px 16px;
            font-size: 0.95rem;
          }
          
          .nav-icon {
            width: 18px;
            height: 18px;
          }
        }

        @media (max-width: 1024px) {
          .hamburger-btn {
            display: flex;
            order: 1;
          }

          .nav-brand {
            display: block;
            order: 2;
            flex: 1;
          }

          .brand-link {
            text-decoration: none;
            color: var(--text-light);
          }

          .brand-text {
            font-size: 1.5rem;
            font-weight: 700;
            background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }

          .nav-links {
            display: none;
          }

          .mobile-cart-container {
            display: block;
            order: 3;
            position: relative;
          }

          .mobile-cart-link {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 44px;
            height: 44px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 50%;
            color: var(--text-light);
            text-decoration: none;
            transition: var(--transition);
            position: relative;
          }

          .mobile-cart-link:hover {
            background: rgba(255, 206, 0, 0.2);
            color: var(--primary-color);
            transform: scale(1.05);
          }

          .mobile-cart-icon {
            font-size: 1.4rem;
          }

          .mobile-cart-badge-mini {
            position: absolute;
            top: -2px;
            right: -2px;
            background: var(--danger-color);
            color: var(--text-light);
            border-radius: 50%;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.7rem;
            font-weight: bold;
            border: 2px solid var(--background-darker);
          }
        }

        @media (max-width: 768px) {
          .nav-container {
            padding: 0 20px;
            height: 65px;
          }
          
          .mobile-menu {
            width: 300px;
          }
          
          .mobile-nav-link {
            padding: 16px 20px;
            font-size: 1.05rem;
          }
          
          .mobile-nav-icon {
            width: 22px;
            height: 22px;
          }

          .brand-text {
            font-size: 1.4rem;
          }
        }

        @media (max-width: 480px) {
          .nav-container {
            padding: 0 15px;
            height: 60px;
          }
          
          .mobile-menu {
            width: 100%;
          }
          
          .mobile-menu-header {
            padding: 20px;
          }
          
          .mobile-nav-links {
            padding: 20px;
          }
          
          .mobile-nav-icon {
            width: 20px;
            height: 20px;
          }

          .brand-text {
            font-size: 1.3rem;
          }

          .mobile-cart-link {
            width: 40px;
            height: 40px;
          }

          .mobile-cart-icon {
            font-size: 1.3rem;
          }
        }

        @media (max-width: 360px) {
          .mobile-nav-link {
            padding: 14px 18px;
            font-size: 1rem;
          }
          
          .mobile-nav-label {
            font-size: 1rem;
          }

          .mobile-menu-header h3 {
            font-size: 1.4rem;
          }
        }
      `}</style>
    </>
  );
};

export default Navigation;