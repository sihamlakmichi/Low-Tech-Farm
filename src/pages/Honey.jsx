import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';

function Hony() {
  const { t } = useLanguage();
  const { addToCart, isInCart } = useCart();
  
  // Créer des catégories constantes
  const CATEGORIES = {
    ALL: 'all',
    CLASSIC: 'classic',
    BLOSSOM: 'blossom',
    FOREST: 'forest'
  };
  
  const [products] = useState([
    {
      id: 1,
      name: t('akazienHonigName'),
      description: t('akazienHonigDesc'),
      price: 9.90,
      image: "https://images.unsplash.com/photo-1587049352851-8d4e89133924?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      categoryKey: CATEGORIES.CLASSIC,
      category: "Honey",
      origin: t('germany'),
      weight: "500g",
      maxQuantity: 10
    },
    {
      id: 2,
      name: t('lavenderHonigName'),
      description: t('lavenderHonigDesc'),
      price: 11.50,
      image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      categoryKey: CATEGORIES.BLOSSOM,
      category: "Honey",
      origin: t('bavaria'),
      weight: "500g",
      maxQuantity: 10
    },
    {
      id: 3,
      name: t('forestHoneyName'),
      description: t('forestHoneyDesc'),
      price: 12.90,
      image: "https://images.unsplash.com/photo-1536599018109-73a2d3cbb89e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      categoryKey: CATEGORIES.FOREST,
      category: "Honey",
      origin: t('blackForest'),
      weight: "500g",
      maxQuantity: 10
    },
    {
      id: 4,
      name: t('lindenHoneyName'),
      description: t('lindenHoneyDesc'),
      price: 10.90,
      image: "https://images.unsplash.com/photo-1587049633312-d628ae50a8ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      categoryKey: CATEGORIES.BLOSSOM,
      category: "Honey",
      origin: t('hesse'),
      weight: "500g",
      maxQuantity: 10
    },
    {
      id: 5,
      name: t('rapeseedHoneyName'),
      description: t('rapeseedHoneyDesc'),
      price: 8.90,
      image: "https://images.unsplash.com/photo-1587049352851-8d4e89133924?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      categoryKey: CATEGORIES.CLASSIC,
      category: "Honey",
      origin: t('lowerSaxony'),
      weight: "500g",
      maxQuantity: 10
    },
    {
      id: 6,
      name: t('firHoneyName'),
      description: t('firHoneyDesc'),
      price: 13.50,
      image: "https://images.unsplash.com/photo-1536599018109-73a2d3cbb89e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      categoryKey: CATEGORIES.FOREST,
      category: "Honey",
      origin: t('bavaria'),
      weight: "500g",
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

  const getCategoryLabel = (categoryKey) => {
    switch(categoryKey) {
      case CATEGORIES.ALL: return t('all');
      case CATEGORIES.CLASSIC: return t('classic');
      case CATEGORIES.BLOSSOM: return t('blossomHoney');
      case CATEGORIES.FOREST: return t('forestHoney');
      default: return categoryKey;
    }
  };

  return (
    <div style={styles.container}>
      <div style={isMobile ? styles.mainContentMobile : styles.mainContent}>
        <div style={isMobile ? styles.shopSectionMobile : styles.shopSection}>
          <div style={styles.filterSection}>
            <h2 style={styles.sectionTitle}>{t('ourHoneyVarieties')}</h2>
            <div style={isMobile ? styles.filterButtonsMobile : styles.filterButtons}>
              {[CATEGORIES.ALL, CATEGORIES.CLASSIC, CATEGORIES.BLOSSOM, CATEGORIES.FOREST].map(categoryKey => (
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
                    <span style={styles.productWeight}>
                      <strong>{t('weight')}:</strong> {product.weight}
                    </span>
                  </div>
                  
                  <div style={isMobile ? styles.productFooterMobile : styles.productFooter}>
                    <div style={styles.productPrice}>{product.price.toFixed(2)} €</div>
                    
                    <button 
                      style={{
                        ...(isMobile ? styles.addToCartButtonMobile : styles.addToCartButton),
                        backgroundColor: isInCart(product.id) ? '#4CAF50' : '#000000'
                      }}
                      onClick={() => handleAddToCart(product)}
                    >
                      {isInCart(product.id) ? '✓ Déjà au panier' : t('addToCart')}
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
    padding: "20px 0",
  },
  mainContent: {
    display: "flex",
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 20px",
  },
  mainContentMobile: {
    display: "flex",
    flexDirection: "column",
    margin: "0 auto",
    padding: "0 15px",
    maxWidth: "100%",
  },
  shopSection: {
    flex: 1,
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
    color: "#000000",
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
    minWidth: "130px",
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
    backgroundColor: "#000000",
    color: "white",
    transform: "translateY(-2px)",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
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
    backgroundColor: "#FFCE00",
    color: "#000000",
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
    color: "#000000",
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
    justifyContent: "space-between",
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
    backgroundColor: "#f8f9fa",
    padding: "10px 15px",
    borderRadius: "8px",
    flex: "1",
    marginRight: "10px",
  },
  productWeight: {
    backgroundColor: "#f8f9fa",
    padding: "10px 15px",
    borderRadius: "8px",
    flex: "1",
    marginLeft: "10px",
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
    color: "#DD0000",
  },
  addToCartButton: {
    backgroundColor: "#000000",
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
    backgroundColor: "#000000",
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
    },
    productsGrid: {
      gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
      gap: "25px",
    },
  },
  '@media (max-width: 768px)': {
    container: {
      padding: "15px 0",
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
    container: {
      padding: "10px 0",
    },
    mainContentMobile: {
      padding: "0 10px",
    },
    filterSection: {
      padding: "20px",
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
      marginRight: "0",
    },
    productWeight: {
      padding: "8px 12px",
      marginLeft: "0",
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

export default Hony;