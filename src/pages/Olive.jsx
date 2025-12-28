import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';

function Olive() {
  const { t } = useLanguage();
  const { addToCart, isInCart } = useCart();
  
  // Catégories constantes
  const CATEGORIES = {
    ALL: 'all',
    EXTRA_VIRGIN: 'extraVirgin',
    VIRGIN: 'virgin',
    ORGANIC: 'organic',
    FLAVORED: 'flavored'
  };
  
  const [products] = useState([
    {
      id: 1,
      name: t('extraVirginPremiumName'),
      description: t('extraVirginPremiumDesc'),
      price: 22.90,
      image: "https://images.unsplash.com/photo-1536975700520-2d436f3d8df4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      categoryKey: CATEGORIES.EXTRA_VIRGIN,
      category: "Olive Oil",
      origin: t('andalusia'),
      acidity: "0.2%",
      volume: "500ml",
      maxQuantity: 10
    },
    {
      id: 2,
      name: t('tuscanOliveOilName'),
      description: t('tuscanOliveOilDesc'),
      price: 18.50,
      image: "https://images.unsplash.com/photo-1505253668822-42074d58a7c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      categoryKey: CATEGORIES.EXTRA_VIRGIN,
      category: "Olive Oil",
      origin: t('tuscany'),
      acidity: "0.3%",
      volume: "500ml",
      maxQuantity: 10
    },
    {
      id: 3,
      name: t('lemonOliveOilName'),
      description: t('lemonOliveOilDesc'),
      price: 16.90,
      image: "https://images.unsplash.com/photo-1505253668822-42074d58a7c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      categoryKey: CATEGORIES.FLAVORED,
      category: "Olive Oil",
      origin: t('sicily'),
      acidity: "0.4%",
      volume: "250ml",
      maxQuantity: 10
    },
    {
      id: 4,
      name: t('organicOliveOilName'),
      description: t('organicOliveOilDesc'),
      price: 20.90,
      image: "https://images.unsplash.com/photo-1536975700520-2d436f3d8df4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      categoryKey: CATEGORIES.ORGANIC,
      category: "Olive Oil",
      origin: t('crete'),
      acidity: "0.25%",
      volume: "500ml",
      maxQuantity: 10
    },
    {
      id: 5,
      name: t('garlicOliveOilName'),
      description: t('garlicOliveOilDesc'),
      price: 15.90,
      image: "https://images.unsplash.com/photo-1505253668822-42074d58a7c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=70",
      categoryKey: CATEGORIES.FLAVORED,
      category: "Olive Oil",
      origin: t('apulia'),
      acidity: "0.5%",
      volume: "250ml",
      maxQuantity: 10
    },
    {
      id: 6,
      name: t('virginOliveOilName'),
      description: t('virginOliveOilDesc'),
      price: 12.50,
      image: "https://images.unsplash.com/photo-1536975700520-2d436f3d8df4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=70",
      categoryKey: CATEGORIES.VIRGIN,
      category: "Olive Oil",
      origin: t('provence'),
      acidity: "0.8%",
      volume: "750ml",
      maxQuantity: 10
    },
    {
      id: 7,
      name: t('basilOliveOilName'),
      description: t('basilOliveOilDesc'),
      price: 17.50,
      image: "https://images.unsplash.com/photo-1505253668822-42074d58a7c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      categoryKey: CATEGORIES.FLAVORED,
      category: "Olive Oil",
      origin: t('liguria'),
      acidity: "0.4%",
      volume: "250ml",
      maxQuantity: 10
    },
    {
      id: 8,
      name: t('bioOrganicOilName'),
      description: t('bioOrganicOilDesc'),
      price: 24.90,
      image: "https://images.unsplash.com/photo-1536975700520-2d436f3d8df4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      categoryKey: CATEGORIES.ORGANIC,
      category: "Olive Oil",
      origin: t('catalonia'),
      acidity: "0.18%",
      volume: "500ml",
      maxQuantity: 10
    }
  ]);

  const [filter, setFilter] = useState(CATEGORIES.ALL);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product, 1);
  };

  const filteredProducts = filter === CATEGORIES.ALL 
    ? products 
    : products.filter(product => product.categoryKey === filter);

  // Fonction pour obtenir la traduction de la catégorie
  const getCategoryLabel = (categoryKey) => {
    switch(categoryKey) {
      case CATEGORIES.ALL: return t('all');
      case CATEGORIES.EXTRA_VIRGIN: return t('extraVirginOliveOil');
      case CATEGORIES.VIRGIN: return t('virginOliveOil');
      case CATEGORIES.ORGANIC: return t('organicOliveOil');
      case CATEGORIES.FLAVORED: return t('flavoredOliveOil');
      default: return categoryKey;
    }
  };

  return (
    <div style={styles.container}>
      {/* En-tête avec drapeau allemand - seulement pour desktop */}
      {!isMobile && (
        <div style={styles.header}>
          <div style={styles.germanFlag}>
            <div style={styles.blackStripe}></div>
            <div style={styles.redStripe}></div>
            <div style={styles.yellowStripe}></div>
          </div>
          <div style={styles.headerContent}>
            <h1 style={styles.logo}>OLIVENÖL</h1>
            <p style={styles.tagline}>{t('oliveOilTagline')}</p>
          </div>
        </div>
      )}

      {isMobile && (
        <div style={styles.mobileHeader}>
          <h1 style={styles.mobileLogo}>OLIVENÖL</h1>
          <p style={styles.mobileTagline}>{t('oliveOilTagline')}</p>
        </div>
      )}

      <div style={isMobile ? styles.mainContentMobile : styles.mainContent}>
        <div style={isMobile ? styles.shopSectionMobile : styles.shopSection}>
          <div style={styles.filterSection}>
            <h2 style={styles.sectionTitle}>{t('ourOliveOilVarieties')}</h2>
            <div style={isMobile ? styles.filterButtonsMobile : styles.filterButtons}>
              {[
                CATEGORIES.ALL, 
                CATEGORIES.EXTRA_VIRGIN, 
                CATEGORIES.VIRGIN, 
                CATEGORIES.ORGANIC, 
                CATEGORIES.FLAVORED
              ].map(categoryKey => (
                <button
                  key={categoryKey}
                  style={{
                    ...(isMobile ? styles.filterButtonMobile : styles.filterButton),
                    ...(filter === categoryKey ? styles.activeFilterButton : {})
                  }}
                  onClick={() => setFilter(categoryKey)}
                >
                  {getCategoryLabel(categoryKey)}
                </button>
              ))}
            </div>
          </div>

          <div style={isMobile ? styles.productsGridMobile : styles.productsGrid}>
            {filteredProducts.map(product => (
              <div key={product.id} style={styles.productCard}>
                <div style={styles.productImageContainer}>
                  <img 
                    src={product.image} 
                    alt={product.name}
                    style={styles.productImage}
                  />
                  <div style={styles.productCategory}>{getCategoryLabel(product.categoryKey)}</div>
                </div>
                
                <div style={styles.productInfo}>
                  <h3 style={styles.productName}>{product.name}</h3>
                  <p style={styles.productDescription}>{product.description}</p>
                  
                  <div style={isMobile ? styles.productDetailsMobile : styles.productDetails}>
                    <span style={styles.productOrigin}>
                      <strong>{t('origin')}:</strong> {product.origin}
                    </span>
                    <span style={styles.productAcidity}>
                      <strong>{t('acidity')}:</strong> {product.acidity}
                    </span>
                    <span style={styles.productVolume}>
                      <strong>{t('volume')}:</strong> {product.volume}
                    </span>
                  </div>
                  
                  <div style={isMobile ? styles.productFooterMobile : styles.productFooter}>
                    <div style={styles.productPrice}>{product.price.toFixed(2)} €</div>
                    <button 
                      style={{
                        ...(isMobile ? styles.addToCartButtonMobile : styles.addToCartButton),
                        backgroundColor: isInCart(product.id) ? '#4CAF50' : '#556B2F'
                      }}
                      onClick={() => handleAddToCart(product)}
                    >
                      {isInCart(product.id) ? '✓ ' + t('alreadyInCart') : t('addToCart')}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "#f8f8f8",
    minHeight: "100vh",
    color: "#333",
  },
  header: {
    backgroundColor: "#556B2F",
    color: "white",
    padding: "20px 0",
    textAlign: "center",
    position: "relative",
  },
  mobileHeader: {
    backgroundColor: "#556B2F",
    color: "white",
    padding: "15px 20px",
    textAlign: "center",
  },
  germanFlag: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "15px",
  },
  blackStripe: {
    backgroundColor: "#000000",
    height: "5px",
  },
  redStripe: {
    backgroundColor: "#DD0000",
    height: "5px",
  },
  yellowStripe: {
    backgroundColor: "#FFCC00",
    height: "5px",
  },
  headerContent: {
    padding: "20px 0",
  },
  logo: {
    fontSize: "48px",
    fontWeight: "bold",
    margin: "10px 0 5px 0",
    letterSpacing: "3px",
  },
  mobileLogo: {
    fontSize: "32px",
    fontWeight: "bold",
    margin: "0 0 5px 0",
    letterSpacing: "2px",
  },
  tagline: {
    fontSize: "18px",
    opacity: 0.9,
    marginTop: "5px",
  },
  mobileTagline: {
    fontSize: "14px",
    opacity: 0.9,
    marginTop: "5px",
  },
  mainContent: {
    display: "flex",
    maxWidth: "1400px",
    margin: "30px auto",
    padding: "0 20px",
  },
  mainContentMobile: {
    display: "flex",
    flexDirection: "column",
    margin: "0 auto",
    padding: "15px",
    maxWidth: "100%",
  },
  shopSection: {
    flex: 1,
    marginRight: "30px",
  },
  shopSectionMobile: {
    width: "100%",
  },
  filterSection: {
    backgroundColor: "white",
    padding: "25px",
    borderRadius: "15px",
    boxShadow: "0 2px 15px rgba(0,0,0,0.1)",
    marginBottom: "30px",
  },
  sectionTitle: {
    color: "#556B2F",
    marginBottom: "25px",
    fontSize: "32px",
    fontWeight: "600",
  },
  filterButtons: {
    display: "flex",
    flexWrap: "wrap",
    gap: "12px",
  },
  filterButtonsMobile: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: "10px",
    justifyContent: "center",
  },
  filterButton: {
    padding: "12px 24px",
    backgroundColor: "#f0f0f0",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "500",
    transition: "all 0.3s",
    fontSize: "15px",
    minWidth: "150px",
    textAlign: "center",
  },
  filterButtonMobile: {
    padding: "10px 15px",
    backgroundColor: "#f0f0f0",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "500",
    transition: "all 0.3s",
    fontSize: "14px",
    flex: "1 1 calc(50% - 10px)",
    minWidth: "0",
    textAlign: "center",
  },
  activeFilterButton: {
    backgroundColor: "#556B2F",
    color: "white",
    transform: "translateY(-2px)",
    boxShadow: "0 4px 8px rgba(85,107,47,0.2)",
  },
  productsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
    gap: "30px",
  },
  productsGridMobile: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "25px",
  },
  productCard: {
    backgroundColor: "white",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
    transition: "transform 0.3s, box-shadow 0.3s",
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  productImageContainer: {
    position: "relative",
    height: "220px",
    overflow: "hidden",
  },
  productImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.5s",
  },
  productCategory: {
    position: "absolute",
    top: "15px",
    right: "15px",
    backgroundColor: "#556B2F",
    color: "white",
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  productInfo: {
    padding: "25px",
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
  },
  productName: {
    fontSize: "22px",
    marginBottom: "12px",
    color: "#556B2F",
    fontWeight: "600",
  },
  productDescription: {
    color: "#666",
    lineHeight: "1.6",
    marginBottom: "20px",
    flexGrow: 1,
    fontSize: "15px",
  },
  productDetails: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    marginBottom: "25px",
    fontSize: "14px",
    color: "#555",
  },
  productDetailsMobile: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    marginBottom: "25px",
    fontSize: "14px",
    color: "#555",
  },
  productOrigin: {
    backgroundColor: "#f5f5dc",
    padding: "10px 15px",
    borderRadius: "8px",
  },
  productAcidity: {
    backgroundColor: "#f5f5dc",
    padding: "10px 15px",
    borderRadius: "8px",
  },
  productVolume: {
    backgroundColor: "#f5f5dc",
    padding: "10px 15px",
    borderRadius: "8px",
  },
  productFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  productFooterMobile: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  productPrice: {
    fontSize: "26px",
    fontWeight: "bold",
    color: "#8B4513",
  },
  addToCartButton: {
    backgroundColor: "#556B2F",
    color: "white",
    border: "none",
    padding: "14px 25px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    transition: "all 0.3s",
    fontSize: "15px",
    minWidth: "160px",
  },
  addToCartButtonMobile: {
    backgroundColor: "#556B2F",
    color: "white",
    border: "none",
    padding: "14px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    transition: "all 0.3s",
    fontSize: "15px",
    width: "100%",
  },
  // Media queries inline
  '@media (max-width: 1024px)': {
    mainContent: {
      padding: "0 15px",
      margin: "20px auto",
    },
    shopSection: {
      marginRight: "0",
    },
    productsGrid: {
      gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
      gap: "25px",
    },
    filterButton: {
      minWidth: "120px",
      padding: "10px 20px",
    },
  },
  '@media (max-width: 768px)': {
    container: {
      padding: "0",
    },
    sectionTitle: {
      fontSize: "28px",
      marginBottom: "20px",
    },
    filterButtonMobile: {
      fontSize: "13px",
      padding: "8px 12px",
    },
    productImageContainer: {
      height: "200px",
    },
    productInfo: {
      padding: "20px",
    },
    productName: {
      fontSize: "20px",
    },
    productDescription: {
      fontSize: "14px",
    },
    productPrice: {
      fontSize: "24px",
    },
    addToCartButtonMobile: {
      padding: "12px",
      fontSize: "14px",
    },
  },
  '@media (max-width: 480px)': {
    mainContentMobile: {
      padding: "10px",
    },
    filterSection: {
      padding: "20px",
      borderRadius: "10px",
      marginBottom: "20px",
    },
    sectionTitle: {
      fontSize: "24px",
    },
    filterButtonMobile: {
      fontSize: "12px",
      padding: "6px 10px",
    },
    productsGridMobile: {
      gap: "20px",
    },
    productImageContainer: {
      height: "180px",
    },
    productCategory: {
      fontSize: "11px",
      padding: "4px 10px",
    },
    productInfo: {
      padding: "15px",
    },
    productName: {
      fontSize: "18px",
    },
    productDescription: {
      fontSize: "13px",
    },
    productDetailsMobile: {
      fontSize: "13px",
    },
    productOrigin: {
      padding: "8px 12px",
    },
    productAcidity: {
      padding: "8px 12px",
    },
    productVolume: {
      padding: "8px 12px",
    },
    productPrice: {
      fontSize: "22px",
    },
    addToCartButtonMobile: {
      fontSize: "13px",
    },
  },
};

// Appliquer les media queries
Object.keys(styles).forEach(key => {
  if (key.startsWith('@media')) {
    const mediaQuery = key;
    const mediaStyles = styles[key];
    
    Object.keys(mediaStyles).forEach(styleKey => {
      if (styles[styleKey]) {
        if (typeof styles[styleKey] === 'object') {
          styles[styleKey] = { ...styles[styleKey], ...mediaStyles[styleKey] };
        }
      }
    });
    
    delete styles[key];
  }
});

export default Olive;