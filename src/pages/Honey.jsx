import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

function Hony() {
  const { t } = useLanguage();
  
  // Créer des catégories constantes qui ne dépendent pas de la traduction
  const CATEGORIES = {
    ALL: 'all',
    CLASSIC: 'classic',
    BLOSSOM: 'blossomHoney',
    FOREST: 'forestHoney'
  };
  
  const [products] = useState([
    {
      id: 1,
      name: t('akazienHonigName'),
      description: t('akazienHonigDesc'),
      price: 9.90,
      image: "https://images.unsplash.com/photo-1587049352851-8d4e89133924?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      categoryKey: CATEGORIES.CLASSIC, // Utiliser la clé constante
      origin: t('germany'),
      weight: "500g"
    },
    {
      id: 2,
      name: t('lavenderHonigName'),
      description: t('lavenderHonigDesc'),
      price: 11.50,
      image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      categoryKey: CATEGORIES.BLOSSOM, // Utiliser la clé constante
      origin: t('bavaria'),
      weight: "500g"
    },
    {
      id: 3,
      name: t('forestHoneyName'),
      description: t('forestHoneyDesc'),
      price: 12.90,
      image: "https://images.unsplash.com/photo-1536599018109-73a2d3cbb89e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      categoryKey: CATEGORIES.FOREST, // Utiliser la clé constante
      origin: t('blackForest'),
      weight: "500g"
    },
    {
      id: 4,
      name: t('lindenHoneyName'),
      description: t('lindenHoneyDesc'),
      price: 10.90,
      image: "https://images.unsplash.com/photo-1587049633312-d628ae50a8ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      categoryKey: CATEGORIES.BLOSSOM, // Utiliser la clé constante
      origin: t('hesse'),
      weight: "500g"
    },
    {
      id: 5,
      name: t('rapeseedHoneyName'),
      description: t('rapeseedHoneyDesc'),
      price: 8.90,
      image: "https://images.unsplash.com/photo-1587049352851-8d4e89133924?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      categoryKey: CATEGORIES.CLASSIC, // Utiliser la clé constante
      origin: t('lowerSaxony'),
      weight: "500g"
    },
    {
      id: 6,
      name: t('firHoneyName'),
      description: t('firHoneyDesc'),
      price: 13.50,
      image: "https://images.unsplash.com/photo-1536599018109-73a2d3cbb89e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      categoryKey: CATEGORIES.FOREST, // Utiliser la clé constante
      origin: t('bavaria'),
      weight: "500g"
    }
  ]);

  const [cart, setCart] = useState([]);
  const [filter, setFilter] = useState(CATEGORIES.ALL); // Utiliser la constante

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
      case CATEGORIES.CLASSIC: return t('classic');
      case CATEGORIES.BLOSSOM: return t('blossomHoney');
      case CATEGORIES.FOREST: return t('forestHoney');
      default: return categoryKey;
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.mainContent}>
        <div style={styles.shopSection}>
          <div style={styles.filterSection}>
            <h2 style={styles.sectionTitle}>{t('ourHoneyVarieties')}</h2>
            <div style={styles.filterButtons}>
              {[CATEGORIES.ALL, CATEGORIES.CLASSIC, CATEGORIES.BLOSSOM, CATEGORIES.FOREST].map(categoryKey => (
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
              <div style={styles.honeyIcon}>🍯</div>
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
            <h3 style={styles.infoTitle}>{t('whyGermanHoney')}</h3>
            <ul style={styles.infoList}>
              <li>✔ {t('supportLocalBeekeepers')}</li>
              <li>✔ {t('shortTransportRoutes')}</li>
              <li>✔ {t('strictQualityControl')}</li>
              <li>✔ {t('sustainableBeekeeping')}</li>
            </ul>
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
    color: "#000000",
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
    backgroundColor: "#000000",
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
    backgroundColor: "#FFCC00",
    color: "#000000",
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
    color: "#000000",
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
    backgroundColor: "#f5f5f5",
    padding: "5px 10px",
    borderRadius: "5px",
  },
  productWeight: {
    backgroundColor: "#f5f5f5",
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
    color: "#DD0000",
  },
  addToCartButton: {
    backgroundColor: "#000000",
    color: "white",
    border: "none",
    padding: "12px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "background-color 0.3s",
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
    color: "#000000",
    fontSize: "24px",
  },
  cartCount: {
    backgroundColor: "#DD0000",
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
  honeyIcon: {
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
    color: "#DD0000",
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
    color: "#000000",
  },
  totalAmount: {
    color: "#DD0000",
  },
  checkoutButton: {
    backgroundColor: "#FFCC00",
    color: "#000000",
    border: "none",
    width: "100%",
    padding: "15px",
    borderRadius: "5px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background-color 0.3s",
    marginBottom: "30px",
  },
  infoBox: {
    backgroundColor: "#f9f9f9",
    padding: "20px",
    borderRadius: "10px",
    borderLeft: "5px solid #000000",
  },
  infoTitle: {
    color: "#000000",
    marginBottom: "15px",
    fontSize: "18px",
  },
  infoList: {
    listStyleType: "none",
    paddingLeft: "0",
  },
  infoListLi: {
    marginBottom: "10px",
  },
};

styles.infoList.li = styles.infoListLi;

export default Hony;