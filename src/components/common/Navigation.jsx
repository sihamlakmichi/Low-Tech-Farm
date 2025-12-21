import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { 
  FaHome, 
  FaBook, 
  FaBox, 
  FaLeaf, 
  FaWineBottle, 
  FaSeedling, 
  FaEnvelope,
  FaBars,
  FaTimes 
} from 'react-icons/fa';

const Navigation = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Fonction pour vérifier si le lien est actif
  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  // Fonction pour fermer le menu après clic sur un lien
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
          >
            <FaBars className="hamburger-icon" />
          </button>

          {/* Navigation desktop */}
          <ul className="nav-links">
            {menuItems.map((item) => (
              <li key={item.path} className="nav-item">
                <Link 
                  to={item.path} 
                  className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-label">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Overlay et menu mobile */}
      <div className={`mobile-menu-overlay ${isMenuOpen ? 'active' : ''}`} 
           onClick={() => setIsMenuOpen(false)}>
      </div>
      
      <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
        <div className="mobile-menu-header">
          <h3>Menu</h3>
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
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <style jsx>{`
        .main-nav {
          background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
          border-bottom: 3px solid #FFCE00;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
        }

        .nav-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 40px;
          position: relative;
        }

        /* Bouton hamburger */
        .hamburger-btn {
          display: none;
          background: none;
          border: none;
          color: white;
          cursor: pointer;
          padding: 12px;
          border-radius: 6px;
          transition: all 0.3s ease;
        }

        .hamburger-btn:hover {
          background: rgba(255, 255, 255, 0.15);
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
          gap: 25px; /* Augmentation de l'espace entre les liens */
          align-items: center;
          justify-content: center;
        }

        .nav-item {
          flex-shrink: 0;
        }

        .nav-link {
          display: flex;
          align-items: center;
          gap: 12px; /* Plus d'espace entre icône et texte */
          color: white;
          text-decoration: none;
          padding: 16px 20px; /* Padding augmenté */
          border-radius: 10px;
          transition: all 0.3s ease;
          font-weight: 500;
          font-size: 1rem;
          border: 1px solid transparent;
          min-height: 50px;
        }

        .nav-link:hover {
          background: rgba(255, 255, 255, 0.12);
          color: #FFCE00;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .nav-link.active {
          background: rgba(255, 206, 0, 0.18);
          color: #FFCE00;
          font-weight: 600;
          border: 2px solid #FFCE00;
          transform: translateY(-1px);
        }

        .nav-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .nav-icon-svg {
          width: 20px;
          height: 20px;
          display: block;
        }

        .nav-label {
          white-space: nowrap;
          font-size: 1.05rem;
        }

        /* Menu mobile */
        .mobile-menu-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.8);
          z-index: 999;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
        }

        .mobile-menu-overlay.active {
          opacity: 1;
          visibility: visible;
        }

        .mobile-menu {
          position: fixed;
          top: 0;
          right: -100%;
          width: 350px; /* Légèrement plus large */
          height: 100vh;
          background: #1a1a1a;
          z-index: 1000;
          transition: right 0.3s ease;
          box-shadow: -5px 0 25px rgba(0, 0, 0, 0.5);
          display: flex;
          flex-direction: column;
        }

        .mobile-menu.active {
          right: 0;
        }

        .mobile-menu-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 25px;
          border-bottom: 2px solid rgba(255, 206, 0, 0.4);
          background: rgba(0, 0, 0, 0.3);
        }

        .mobile-menu-header h3 {
          color: #FFCE00;
          margin: 0;
          font-size: 1.6rem;
          font-weight: 700;
        }

        .close-btn {
          background: none;
          border: none;
          color: white;
          cursor: pointer;
          padding: 10px;
          border-radius: 6px;
          transition: all 0.3s ease;
        }

        .close-btn:hover {
          background: rgba(255, 255, 255, 0.15);
        }

        .close-icon {
          width: 22px;
          height: 22px;
        }

        .mobile-nav-links {
          list-style: none;
          margin: 0;
          padding: 25px;
          display: flex;
          flex-direction: column;
          gap: 15px; /* Plus d'espace entre les liens mobiles */
          flex: 1;
        }

        .mobile-nav-item {
          border-radius: 10px;
          overflow: hidden;
        }

        .mobile-nav-link {
          display: flex;
          align-items: center;
          gap: 16px; /* Plus d'espace entre icône et texte */
          color: white;
          text-decoration: none;
          padding: 18px 22px; /* Padding augmenté */
          border-radius: 10px;
          transition: all 0.3s ease;
          font-size: 1.15rem;
          border: 1px solid transparent;
          min-height: 60px;
        }

        .mobile-nav-link:hover {
          background: rgba(255, 255, 255, 0.12);
          transform: translateX(8px);
        }

        .mobile-nav-link.active {
          background: rgba(255, 206, 0, 0.18);
          color: #FFCE00;
          font-weight: 600;
          border: 2px solid #FFCE00;
        }

        .mobile-nav-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          flex-shrink: 0;
        }

        .mobile-nav-label {
          flex: 1;
          font-size: 1.1rem;
        }

        /* Responsive */
        @media (max-width: 1200px) {
          .nav-container {
            padding: 0 30px;
          }
          
          .nav-links {
            gap: 20px;
          }
          
          .nav-link {
            padding: 14px 18px;
            font-size: 0.95rem;
          }
        }

        @media (max-width: 1024px) {
          .hamburger-btn {
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .nav-links {
            display: none;
          }

          .nav-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px 30px;
          }
        }

        @media (max-width: 768px) {
          .nav-container {
            padding: 12px 20px;
          }
          
          .mobile-menu {
            width: 320px;
          }
          
          .mobile-nav-link {
            padding: 16px 20px;
            font-size: 1.1rem;
          }
        }

        @media (max-width: 480px) {
          .mobile-menu {
            width: 100%;
          }
          
          .mobile-menu-header {
            padding: 20px;
          }
          
          .mobile-nav-links {
            padding: 20px;
          }
        }
      `}</style>
    </>
  );
};

export default Navigation;