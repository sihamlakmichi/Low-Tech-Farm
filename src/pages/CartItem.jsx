import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import { useCart } from "../contexts/CartContext";

export default function CartItem({ item, onRemove }) {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="cart-item">
      <img src={item.image} alt={item.name} />

      <div className="item-info">
        <h3>{item.name}</h3>
        <p>{item.price} €</p>
      </div>

      <div className="item-qty">
        <button
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
          disabled={item.quantity <= 1}
        >
          <FaMinus />
        </button>

        <span>{item.quantity}</span>

        <button
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
        >
          <FaPlus />
        </button>
      </div>

      <div className="item-total">
        <strong>{item.price * item.quantity} €</strong>
        <button
          onClick={() => {
            removeFromCart(item.id);
            onRemove();
          }}
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
}
