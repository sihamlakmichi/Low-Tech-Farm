export default function CartSummary({ subtotal }) {
  const shipping = subtotal > 100 ? 0 : 9.99;
  const total = subtotal + shipping;

  return (
    <aside className="cart-summary">
      <h2>Récapitulatif</h2>

      <div className="summary-row">
        <span>Sous-total</span>
        <span>{subtotal.toFixed(2)} €</span>
      </div>

      <div className="summary-row">
        <span>Livraison</span>
        <span>{shipping === 0 ? "Gratuite" : shipping + " €"}</span>
      </div>

      <div className="summary-row total">
        <span>Total</span>
        <span>{total.toFixed(2)} €</span>
      </div>

      <button className="checkout-btn">
        Finaliser la commande
      </button>
    </aside>
  );
}
