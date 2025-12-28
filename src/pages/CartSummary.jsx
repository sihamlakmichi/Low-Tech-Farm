import React from "react";

export default function CartSummary({ subtotal }) {
  return (
    <div className="cart-summary">
      <h2>Résumé du panier</h2>
      <p>Sous-total : {subtotal.toFixed(2)} €</p>
      <button className="checkout-btn">Passer à la caisse</button>
    </div>
  );
}
