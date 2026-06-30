import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="page cart-page">
        <h2>Your Cart</h2>
        <p>Your cart is empty.</p>
        <Link to="/shop" className="btn primary">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="page cart-page">
      <h2>Your Cart</h2>
      <div className="cart-items">
        {cart.map((item) => (
          <div key={item._id} className="cart-item">
            <div className="cart-item-info">
              <h4>{item.name}</h4>
              <p>${item.price.toFixed(2)}</p>
            </div>
            <div className="cart-item-qty">
              <button onClick={() => updateQuantity(item._id, item.quantity - 1)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
            </div>
            <p className="cart-item-total">${(item.price * item.quantity).toFixed(2)}</p>
            <button className="btn danger small" onClick={() => removeFromCart(item._id)}>Remove</button>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <h3>Total: ${cartTotal.toFixed(2)}</h3>
        <button className="btn secondary small" onClick={clearCart}>Clear Cart</button>
        {user ? (
          <button className="btn primary" onClick={() => navigate('/checkout')}>Proceed to Checkout</button>
        ) : (
          <Link to="/login" className="btn primary">Login to Checkout</Link>
        )}
      </div>
    </div>
  );
}
