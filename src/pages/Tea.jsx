import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

function Tea() {
  const { t } = useLanguage();
  
  // Catégories constantes
  const CATEGORIES = {
    ALL: 'all',
    BLACK: 'blackTea',
    GREEN: 'greenTea',
    HERBAL: 'herbalTea',
    FRUIT: 'fruitTea'
  };
  
  const [products] = useState([
    {
      id: 1,
      name: t('earlGreyName'),
      description: t('earlGreyDesc'),
      price: 8.90,
      image: "https://images.unsplash.com/photo-1560343090-f0409e92791a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      categoryKey: CATEGORIES.BLACK,
      origin: t('england'),
      weight: "100g"
    },
    {
      id: 2,
      name: t('jasmineTeaName'),
      description: t('jasmineTeaDesc'),
      price: 10.50,
      image: "https://images.unsplash.com/photo-1561047029-3000c68339ca?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      categoryKey: CATEGORIES.GREEN,
      origin: t('china'),
      weight: "100g"
    },
    {
      id: 3,
      name: t('chamomileTeaName'),
      description: t('chamomileTeaDesc'),
      price: 7.90,
      image: "https://images.unsplash.com/photo-1597481499751-6d6c3cbf29c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      categoryKey: CATEGORIES.HERBAL,
      origin: t('egypt'),
      weight: "100g"
    },
    {
      id: 4,
      name: t('peppermintTeaName'),
      description: t('peppermintTeaDesc'),
      price: 6.90,
      image: "https://images.unsplash.com/photo-1597481499751-6d6c3cbf29c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      categoryKey: CATEGORIES.HERBAL,
      origin: t('morocco'),
      weight: "100g"
    },
    {
      id: 5,
      name: t('darjeelingName'),
      description: t('darjeelingDesc'),
      price: 12.90,
      image: "https://images.unsplash.com/photo-1561047029-3000c68339ca?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      categoryKey: CATEGORIES.BLACK,
      origin: t('india'),
      weight: "100g"
    },
    {
      id: 6,
      name: t('berryTeaName'),
      description: t('berryTeaDesc'),
      price: 9.50,
      image: "https://images.unsplash.com/photo-1560343090-f0409e92791a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      categoryKey: CATEGORIES.FRUIT,
      origin: t('germany'),
      weight: "100g"
    },
    {
      id: 7,
      name: t('matchaName'),
      description: t('matchaDesc'),
      price: 15.90,
      image: "https://images.unsplash.com/photo-1559177240-0a02b4004da8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      categoryKey: CATEGORIES.GREEN,
      origin: t('japan'),
      weight: "50g"
    },
    {
      id: 8,
      name: t('rooibosName'),
      description: t('rooibosDesc'),
      price: 8.50,
      image: "https://images.unsplash.com/photo-1559177240-0a02b4004da8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      categoryKey: CATEGORIES.HERBAL,
      origin: t('southAfrica'),
      weight: "100g"
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
      case CATEGORIES.BLACK: return t('blackTea');
      case CATEGORIES.GREEN: return t('greenTea');
      case CATEGORIES.HERBAL: return t('herbalTea');
      case CATEGORIES.FRUIT: return t('fruitTea');
      default: return categoryKey;
    }
  };

  return (
    <div style={styles.container}>
      {/* En-tête avec drapeau allemand */}
      <div style={styles.mainContent}>
        <div style={styles.shopSection}>
          <div style={styles.filterSection}>
            <h2 style={styles.sectionTitle}>{t('ourTeaVarieties')}</h2>
            <div style={styles.filterButtons}>
              {[
                CATEGORIES.ALL, 
                CATEGORIES.BLACK, 
                CATEGORIES.GREEN, 
                CATEGORIES.HERBAL, 
                CATEGORIES.FRUIT
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
                    <span style={styles.productWeight}>
                      <strong>{t('weight')}:</strong> {product.weight}
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
              <div style={styles.teaIcon}>🍵</div>
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
            <h3 style={styles.infoTitle}>{t('whyQualityTea')}</h3>
            <ul style={styles.infoList}>
              <li>✔ {t('premiumSelection')}</li>
              <li>✔ {t('directFromProducer')}</li>
              <li>✔ {t('freshlyPackaged')}</li>
              <li>✔ {t('sustainableCultivation')}</li>
              <li>✔ {t('fairTrade')}</li>
            </ul>
          </div>

          <div style={styles.brewingTips}>
            <h3 style={styles.brewingTitle}>{t('brewingTips')}</h3>
            <p style={styles.brewingText}>
              {t('brewingDescription')}
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
    backgroundColor: "#1a5f23",
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
    color: "#1a5f23",
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
    backgroundColor: "#1a5f23",
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
    backgroundColor: "#1a5f23",
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
    color: "#1a5f23",
  },
  productDescription: {
    color: "#666",
    lineHeight: "1.5",
    marginBottom: "15px",
    flexGrow: 1,
  },
  productDetails: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
    fontSize: "14px",
    color: "#555",
  },
  productOrigin: {
    backgroundColor: "#f0f8f0",
    padding: "5px 10px",
    borderRadius: "5px",
  },
  productWeight: {
    backgroundColor: "#f0f8f0",
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
    color: "#d32f2f",
  },
  addToCartButton: {
    backgroundColor: "#1a5f23",
    color: "white",
    border: "none",
    padding: "12px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "background-color 0.3s",
    ':hover': {
      backgroundColor: '#2e7d32'
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
    color: "#1a5f23",
    fontSize: "24px",
  },
  cartCount: {
    backgroundColor: "#d32f2f",
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
  teaIcon: {
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
    color: "#d32f2f",
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
    color: "#1a5f23",
  },
  totalAmount: {
    color: "#d32f2f",
  },
  checkoutButton: {
    backgroundColor: "#ff9800",
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
      backgroundColor: '#f57c00'
    }
  },
  infoBox: {
    backgroundColor: "#f0f8f0",
    padding: "20px",
    borderRadius: "10px",
    borderLeft: "5px solid #1a5f23",
    marginBottom: "20px",
  },
  infoTitle: {
    color: "#1a5f23",
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
  brewingTips: {
    backgroundColor: "#fff8e1",
    padding: "20px",
    borderRadius: "10px",
    borderLeft: "5px solid #ff9800",
  },
  brewingTitle: {
    color: "#ff9800",
    marginBottom: "15px",
    fontSize: "18px",
  },
  brewingText: {
    color: "#666",
    lineHeight: "1.5",
    fontSize: "14px",
  },
  footer: {
    backgroundColor: "#1a5f23",
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
    color: "#ffcc80",
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

export default Tea;