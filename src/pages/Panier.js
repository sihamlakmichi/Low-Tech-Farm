import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import { FaShoppingBag, FaArrowLeft } from "react-icons/fa";
import "./cart.css";

export default function Panier({ isModal = false, onClose = () => {} }) {
  const { cartItems, clearCart, cartItemCount, calculateSubtotal } = useCart();
  const [success, setSuccess] = useState(false);

  // Supprimer un article avec notification temporaire
  const handleRemove = () => {
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
  };

  if (cartItems.length === 0) {
    return (
      <div className="empty-cart">
        <FaShoppingBag size={60} />
        <h2>Votre panier est vide</h2>
        <Link to="/products" className="btn-primary">
          Découvrir les produits
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      {!isModal && (
        <header className="cart-header">
          <h1>
            <FaShoppingBag /> Panier ({cartItemCount})
          </h1>
          <Link to="/products" className="back-link">
            <FaArrowLeft /> Continuer mes achats
          </Link>
        </header>
      )}

      {success && <div className="success-toast">Article supprimé ✔</div>}

      <div className="cart-layout">
        <div className="cart-items">
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} onRemove={handleRemove} />
          ))}

          <button className="clear-cart" onClick={clearCart}>
            Vider le panier
          </button>
        </div>

        <CartSummary subtotal={calculateSubtotal()} />
      </div>
    </div>
  );
}
