import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';

function Tea() {
  const { t } = useLanguage();
  const { addToCart, isInCart, cartItems } = useCart();

  /* ================== CATEGORIES ================== */
  const CATEGORIES = {
    ALL: 'all',
    BLACK: 'blackTea',
    GREEN: 'greenTea',
    HERBAL: 'herbalTea',
    FRUIT: 'fruitTea'
  };

  /* ================== PRODUITS ================== */
  const [products] = useState([
    {
      id: 201,
      name: t('earlGreyName'),
      description: t('earlGreyDesc'),
      price: 8.90,
      image: "https://images.unsplash.com/photo-1560343090-f0409e92791a",
      categoryKey: CATEGORIES.BLACK,
      category: "Tea",
      origin: t('england'),
      weight: "100g",
      maxQuantity: 10
    },
    {
      id: 202,
      name: t('jasmineTeaName'),
      description: t('jasmineTeaDesc'),
      price: 10.50,
      image: "https://images.unsplash.com/photo-1561047029-3000c68339ca",
      categoryKey: CATEGORIES.GREEN,
      category: "Tea",
      origin: t('china'),
      weight: "100g",
      maxQuantity: 10
    },
    {
      id: 203,
      name: t('chamomileTeaName'),
      description: t('chamomileTeaDesc'),
      price: 7.90,
      image: "https://images.unsplash.com/photo-1597481499751-6d6c3cbf29c8",
      categoryKey: CATEGORIES.HERBAL,
      category: "Tea",
      origin: t('egypt'),
      weight: "100g",
      maxQuantity: 10
    },
    {
      id: 204,
      name: t('berryTeaName'),
      description: t('berryTeaDesc'),
      price: 9.50,
      image: "https://images.unsplash.com/photo-1560343090-f0409e92791a",
      categoryKey: CATEGORIES.FRUIT,
      category: "Tea",
      origin: t('germany'),
      weight: "100g",
      maxQuantity: 10
    }
  ]);

  /* ================== FILTRE ================== */
  const [filter, setFilter] = useState(CATEGORIES.ALL);

  const filteredProducts =
    filter === CATEGORIES.ALL
      ? products
      : products.filter(p => p.categoryKey === filter);

  /* ================== HELPERS ================== */
  const getCategoryLabel = (key) => {
    switch (key) {
      case CATEGORIES.ALL: return t('all');
      case CATEGORIES.BLACK: return t('blackTea');
      case CATEGORIES.GREEN: return t('greenTea');
      case CATEGORIES.HERBAL: return t('herbalTea');
      case CATEGORIES.FRUIT: return t('fruitTea');
      default: return key;
    }
  };

  const handleAddToCart = (product) => {
    addToCart(product, 1);
  };

  /* ================== RENDER ================== */
  return (
    <div style={styles.container}>
      <div style={styles.mainContent}>

        {/* ====== SECTION PRODUITS ====== */}
        <div style={styles.shopSection}>

          <div style={styles.filterSection}>
            <h2 style={styles.sectionTitle}>{t('ourTeaVarieties')}</h2>
            <div style={styles.filterButtons}>
              {Object.values(CATEGORIES).map(key => (
                <button
                  key={key}
                  style={{
                    ...styles.filterButton,
                    ...(filter === key ? styles.activeFilterButton : {})
                  }}
                  onClick={() => setFilter(key)}
                >
                  {getCategoryLabel(key)}
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
                  <div style={styles.productCategory}>
                    {getCategoryLabel(product.categoryKey)}
                  </div>
                </div>

                <div style={styles.productInfo}>
                  <h3 style={styles.productName}>{product.name}</h3>
                  <p style={styles.productDescription}>{product.description}</p>

                  <div style={styles.productDetails}>
                    <span><strong>{t('origin')}:</strong> {product.origin}</span>
                    <span><strong>{t('weight')}:</strong> {product.weight}</span>
                  </div>

                  <div style={styles.productFooter}>
                    <div style={styles.productPrice}>
                      {product.price.toFixed(2)} €
                    </div>

                    <button
                      style={{
                        ...styles.addToCartButton,
                        backgroundColor: isInCart(product.id)
                          ? '#4CAF50'
                          : '#1a5f23'
                      }}
                      onClick={() => handleAddToCart(product)}
                    >
                      {isInCart(product.id)
                        ? '✓ Déjà au panier'
                        : t('addToCart')}
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

/* ================== STYLES ================== */
const styles = {
  container: {
    backgroundColor: "#f8f8f8",
    minHeight: "100vh",
    padding: "30px 0",
    fontFamily: "Segoe UI, sans-serif"
  },
  mainContent: {
    maxWidth: "1300px",
    margin: "0 auto",
    display: "flex",
    gap: "30px",
    padding: "0 20px"
  },
  shopSection: {
    flex: 3
  },
  filterSection: {
    background: "white",
    padding: "25px",
    borderRadius: "12px",
    marginBottom: "30px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
  },
  sectionTitle: {
    fontSize: "28px",
    marginBottom: "20px",
    color: "#1a5f23"
  },
  filterButtons: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap"
  },
  filterButton: {
    padding: "10px 20px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    background: "#eee"
  },
  activeFilterButton: {
    background: "#1a5f23",
    color: "white"
  },
  productsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "25px"
  },
  productCard: {
    background: "white",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column"
  },
  productImageContainer: {
    height: "200px",
    position: "relative"
  },
  productImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover"
  },
  productCategory: {
    position: "absolute",
    top: "10px",
    right: "10px",
    background: "#1a5f23",
    color: "white",
    padding: "5px 12px",
    borderRadius: "20px",
    fontSize: "12px"
  },
  productInfo: {
    padding: "20px",
    flexGrow: 1,
    display: "flex",
    flexDirection: "column"
  },
  productName: {
    fontSize: "20px",
    marginBottom: "10px"
  },
  productDescription: {
    flexGrow: 1,
    color: "#666",
    marginBottom: "15px"
  },
  productDetails: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "15px",
    fontSize: "14px"
  },
  productFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  productPrice: {
    fontSize: "22px",
    fontWeight: "bold",
    color: "#d32f2f"
  },
  addToCartButton: {
    color: "white",
    border: "none",
    padding: "12px 18px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600"
  },
  cartSidebar: {
    flex: 1,
    background: "white",
    padding: "25px",
    borderRadius: "12px",
    height: "fit-content",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
  },
  cartTitle: {
    fontSize: "22px",
    marginBottom: "10px"
  },
  cartCount: {
    fontWeight: "bold",
    color: "#1a5f23"
  }
};

export default Tea;
