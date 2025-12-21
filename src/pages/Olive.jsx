import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

function Olive() {
  const { t } = useLanguage();
  
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
      origin: t('andalusia'),
      acidity: "0.2%",
      volume: "500ml"
    },
    {
      id: 2,
      name: t('tuscanOliveOilName'),
      description: t('tuscanOliveOilDesc'),
      price: 18.50,
      image: "https://images.unsplash.com/photo-1505253668822-42074d58a7c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      categoryKey: CATEGORIES.EXTRA_VIRGIN,
      origin: t('tuscany'),
      acidity: "0.3%",
      volume: "500ml"
    },
    {
      id: 3,
      name: t('lemonOliveOilName'),
      description: t('lemonOliveOilDesc'),
      price: 16.90,
      image: "https://images.unsplash.com/photo-1505253668822-42074d58a7c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      categoryKey: CATEGORIES.FLAVORED,
      origin: t('sicily'),
      acidity: "0.4%",
      volume: "250ml"
    },
    {
      id: 4,
      name: t('organicOliveOilName'),
      description: t('organicOliveOilDesc'),
      price: 20.90,
      image: "https://images.unsplash.com/photo-1536975700520-2d436f3d8df4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      categoryKey: CATEGORIES.ORGANIC,
      origin: t('crete'),
      acidity: "0.25%",
      volume: "500ml"
    },
    {
      id: 5,
      name: t('garlicOliveOilName'),
      description: t('garlicOliveOilDesc'),
      price: 15.90,
      image: "https://images.unsplash.com/photo-1505253668822-42074d58a7c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=70",
      categoryKey: CATEGORIES.FLAVORED,
      origin: t('apulia'),
      acidity: "0.5%",
      volume: "250ml"
    },
    {
      id: 6,
      name: t('virginOliveOilName'),
      description: t('virginOliveOilDesc'),
      price: 12.50,
      image: "https://images.unsplash.com/photo-1536975700520-2d436f3d8df4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=70",
      categoryKey: CATEGORIES.VIRGIN,
      origin: t('provence'),
      acidity: "0.8%",
      volume: "750ml"
    },
    {
      id: 7,
      name: t('basilOliveOilName'),
      description: t('basilOliveOilDesc'),
      price: 17.50,
      image: "https://images.unsplash.com/photo-1505253668822-42074d58a7c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      categoryKey: CATEGORIES.FLAVORED,
      origin: t('liguria'),
      acidity: "0.4%",
      volume: "250ml"
    },
    {
      id: 8,
      name: t('bioOrganicOilName'),
      description: t('bioOrganicOilDesc'),
      price: 24.90,
      image: "https://images.unsplash.com/photo-1536975700520-2d436f3d8df4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      categoryKey: CATEGORIES.ORGANIC,
      origin: t('catalonia'),
      acidity: "0.18%",
      volume: "500ml"
    }
  ]);

  const [cart, setCart] = useState([]);
  const [filter, setFilter] = useState(CATEGORIES.ALL);

  const addToCart = (product) => {
    setCart([...cart, product]);
    alert(`${product.name} ${t('addedToCart')}`);
  };

  const filteredProducts = filter === CATEGORIES.ALL 
    ? products 
    : products.filter(product => product.categoryKey === filter);

  const cartTotal = cart.reduce((total, item) => total + item.price, 0);

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
      {/* En-tête avec drapeau allemand */}
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

      <div style={styles.mainContent}>
        <div style={styles.shopSection}>
          <div style={styles.filterSection}>
            <h2 style={styles.sectionTitle}>{t('ourOliveOilVarieties')}</h2>
            <div style={styles.filterButtons}>
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
                    ...styles.filterButton,
                    ...(filter === categoryKey ? styles.activeFilterButton : {})
                  }}
                  onClick={() => setFilter(categoryKey)}
                >
                  {getCategoryLabel(categoryKey)}
                </button>
              ))}
            </div>
          </div>

          <div style={styles.productsGrid}>
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
                  
                  <div style={styles.productDetails}>
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
                  
                  <div style={styles.productFooter}>
                    <div style={styles.productPrice}>{product.price.toFixed(2)} €</div>
                    <button 
                      style={styles.addToCartButton}
                      onClick={() => addToCart(product)}
                    >
                      {t('addToCart')}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside style={styles.cartSidebar}>
          <div style={styles.cartHeader}>
            <h2 style={styles.cartTitle}>{t('shoppingCart')}</h2>
            <div style={styles.cartCount}>{cart.length} {t('items')}</div>
          </div>
          
          {cart.length === 0 ? (
            <div style={styles.emptyCart}>
              <p style={styles.emptyCartText}>{t('cartEmpty')}</p>
              <div style={styles.oliveIcon}>🫒</div>
            </div>
          ) : (
            <>
              <div style={styles.cartItems}>
                {cart.map((item, index) => (
                  <div key={index} style={styles.cartItem}>
                    <div style={styles.cartItemInfo}>
                      <div style={styles.cartItemName}>{item.name}</div>
                      <div style={styles.cartItemPrice}>{item.price.toFixed(2)} €</div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div style={styles.cartTotal}>
                <div style={styles.totalLabel}>{t('totalAmount')}:</div>
                <div style={styles.totalAmount}>{cartTotal.toFixed(2)} €</div>
              </div>
              
              <button style={styles.checkoutButton}>
                {t('proceedToCheckout')}
              </button>
            </>
          )}
          
          <div style={styles.infoBox}>
            <h3 style={styles.infoTitle}>{t('whyQualityOliveOil')}</h3>
            <ul style={styles.infoList}>
              <li>✔ {t('coldPressed')}</li>
              <li>✔ {t('firstColdPress')}</li>
              <li>✔ {t('lowAcidity')}</li>
              <li>✔ {t('richInPolyphenols')}</li>
              <li>✔ {t('sustainableFarming')}</li>
            </ul>
          </div>

          <div style={styles.storageTips}>
            <h3 style={styles.storageTitle}>{t('storageTips')}</h3>
            <p style={styles.storageText}>
              {t('storageDescription')}
            </p>
          </div>
        </aside>
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
  tagline: {
    fontSize: "18px",
    opacity: 0.9,
    marginTop: "5px",
  },
  mainContent: {
    display: "flex",
    maxWidth: "1400px",
    margin: "30px auto",
    padding: "0 20px",
  },
  shopSection: {
    flex: 3,
    marginRight: "30px",
  },
  filterSection: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    marginBottom: "30px",
  },
  sectionTitle: {
    color: "#556B2F",
    marginBottom: "20px",
    fontSize: "28px",
  },
  filterButtons: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
  },
  filterButton: {
    padding: "10px 20px",
    backgroundColor: "#f0f0f0",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "500",
    transition: "all 0.3s",
  },
  activeFilterButton: {
    backgroundColor: "#556B2F",
    color: "white",
  },
  productsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "25px",
  },
  productCard: {
    backgroundColor: "white",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    transition: "transform 0.3s, box-shadow 0.3s",
    display: "flex",
    flexDirection: "column",
    ':hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 8px 20px rgba(0,0,0,0.15)'
    }
  },
  productImageContainer: {
    position: "relative",
    height: "200px",
    overflow: "hidden",
  },
  productImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  productCategory: {
    position: "absolute",
    top: "15px",
    right: "15px",
    backgroundColor: "#556B2F",
    color: "white",
    padding: "5px 10px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "bold",
  },
  productInfo: {
    padding: "20px",
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
  },
  productName: {
    fontSize: "22px",
    marginBottom: "10px",
    color: "#556B2F",
  },
  productDescription: {
    color: "#666",
    lineHeight: "1.5",
    marginBottom: "15px",
    flexGrow: 1,
  },
  productDetails: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    marginBottom: "20px",
    fontSize: "14px",
    color: "#555",
  },
  productOrigin: {
    backgroundColor: "#f5f5dc",
    padding: "5px 10px",
    borderRadius: "5px",
  },
  productAcidity: {
    backgroundColor: "#f5f5dc",
    padding: "5px 10px",
    borderRadius: "5px",
  },
  productVolume: {
    backgroundColor: "#f5f5dc",
    padding: "5px 10px",
    borderRadius: "5px",
  },
  productFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  productPrice: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#8B4513",
  },
  addToCartButton: {
    backgroundColor: "#556B2F",
    color: "white",
    border: "none",
    padding: "12px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "background-color 0.3s",
    ':hover': {
      backgroundColor: '#6B8E23'
    }
  },
  cartSidebar: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: "10px",
    padding: "25px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    height: "fit-content",
  },
  cartHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    paddingBottom: "15px",
    borderBottom: "2px solid #f0f0f0",
  },
  cartTitle: {
    color: "#556B2F",
    fontSize: "24px",
  },
  cartCount: {
    backgroundColor: "#8B4513",
    color: "white",
    borderRadius: "20px",
    padding: "5px 15px",
    fontSize: "14px",
    fontWeight: "bold",
  },
  emptyCart: {
    textAlign: "center",
    padding: "40px 20px",
  },
  emptyCartText: {
    color: "#666",
    fontSize: "18px",
    marginBottom: "20px",
  },
  oliveIcon: {
    fontSize: "60px",
  },
  cartItems: {
    marginBottom: "20px",
  },
  cartItem: {
    padding: "15px 0",
    borderBottom: "1px solid #f0f0f0",
  },
  cartItemInfo: {
    display: "flex",
    justifyContent: "space-between",
  },
  cartItemName: {
    fontWeight: "500",
  },
  cartItemPrice: {
    fontWeight: "bold",
    color: "#8B4513",
  },
  cartTotal: {
    display: "flex",
    justifyContent: "space-between",
    padding: "20px 0",
    borderTop: "2px solid #f0f0f0",
    borderBottom: "2px solid #f0f0f0",
    marginBottom: "20px",
    fontSize: "18px",
    fontWeight: "bold",
  },
  totalLabel: {
    color: "#556B2F",
  },
  totalAmount: {
    color: "#8B4513",
  },
  checkoutButton: {
    backgroundColor: "#DAA520",
    color: "white",
    border: "none",
    width: "100%",
    padding: "15px",
    borderRadius: "5px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background-color 0.3s",
    marginBottom: "20px",
    ':hover': {
      backgroundColor: '#B8860B'
    }
  },
  infoBox: {
    backgroundColor: "#f5f5dc",
    padding: "20px",
    borderRadius: "10px",
    borderLeft: "5px solid #556B2F",
    marginBottom: "20px",
  },
  infoTitle: {
    color: "#556B2F",
    marginBottom: "15px",
    fontSize: "18px",
  },
  infoList: {
    listStyleType: "none",
    paddingLeft: "0",
  },
  infoListLi: {
    marginBottom: "8px",
    color: "#555",
  },
  storageTips: {
    backgroundColor: "#fff8dc",
    padding: "20px",
    borderRadius: "10px",
    borderLeft: "5px solid #DAA520",
  },
  storageTitle: {
    color: "#DAA520",
    marginBottom: "15px",
    fontSize: "18px",
  },
  storageText: {
    color: "#666",
    lineHeight: "1.5",
    fontSize: "14px",
  },
  footer: {
    backgroundColor: "#556B2F",
    color: "white",
    padding: "40px 0 20px 0",
    marginTop: "50px",
  },
  footerContent: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
    padding: "0 20px",
    marginBottom: "30px",
  },
  footerSection: {
    flex: 1,
    minWidth: "250px",
    marginBottom: "30px",
    padding: "0 20px",
  },
  footerTitle: {
    fontSize: "20px",
    marginBottom: "15px",
    color: "#DAA520",
  },
  copyright: {
    textAlign: "center",
    paddingTop: "20px",
    borderTop: "1px solid rgba(255,255,255,0.1)",
    color: "rgba(255,255,255,0.7)",
    fontSize: "14px",
  }
};

styles.infoList.li = styles.infoListLi;

export default Olive;