import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  // Charger le panier depuis le localStorage au démarrage
  const loadCartFromStorage = () => {
    try {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error('Error loading cart from storage:', error);
      return [];
    }
  };

  const [cartItems, setCartItems] = useState(loadCartFromStorage);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Sauvegarder le panier dans le localStorage à chaque modification
  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    } catch (error) {
      console.error('Error saving cart to storage:', error);
    }
  }, [cartItems]);

  // Ajouter un produit au panier
  const addToCart = (product, quantity = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        // Si le produit existe déjà, mettre à jour la quantité
        const newQuantity = existingItem.quantity + quantity;
        if (newQuantity > (product.maxQuantity || 99)) {
          alert(`Quantité maximum atteinte pour ${product.name}`);
          return prevItems;
        }
        
        return prevItems.map(item =>
          item.id === product.id 
            ? { ...item, quantity: newQuantity }
            : item
        );
      }
      
      // Si c'est un nouveau produit, l'ajouter au panier
      return [...prevItems, { 
        ...product, 
        quantity: Math.min(quantity, product.maxQuantity || 99)
      }];
    });
  };

  // Retirer un produit du panier
  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  // Mettre à jour la quantité d'un produit
  const updateQuantity = (id, quantity) => {
    if (quantity < 1) {
      removeFromCart(id);
      return;
    }

    setCartItems(prev =>
      prev.map(item =>
        item.id === id 
          ? { ...item, quantity: Math.min(quantity, item.maxQuantity || 99) }
          : item
      )
    );
  };

  // Vider complètement le panier
  const clearCart = () => {
    setCartItems([]);
  };

  // Ouvrir/fermer le panier
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  // Calculer le sous-total
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => 
      total + (item.price * item.quantity), 0
    );
  };

  // Calculer le nombre total d'articles
  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Vérifier si un produit est déjà dans le panier
  const isInCart = (productId) => {
    return cartItems.some(item => item.id === productId);
  };

  // Obtenir la quantité d'un produit dans le panier
  const getProductQuantity = (productId) => {
    const item = cartItems.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      openCart,
      closeCart,
      isCartOpen,
      setIsCartOpen,
      calculateSubtotal,
      cartItemCount,
      isInCart,
      getProductQuantity
    }}>
      {children}
    </CartContext.Provider>
  );
};