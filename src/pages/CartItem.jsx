import React from "react";
import { FaTrash } from "react-icons/fa";

export default function CartItem({ item, onRemove }) {
  return (
    <div className="cart-item">
      <div className="item-info">
        <h3>{item.name}</h3>
        <p>Prix: {item.price} €</p>
        <p>Quantité: {item.quantity}</p>
      </div>
      <button className="remove-item" onClick={onRemove}>
        <FaTrash />
      </button>
    </div>
  );
}
