import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Checkout() {
  const { user } = useAuth();
  const { cart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!user) navigate('/login');
    if (cart.length === 0) navigate('/cart');
  }, [user, cart, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };

      const { data: order } = await axios.post('/api/orders', {
        items: cart.map((item) => ({ productId: item._id, quantity: item.quantity })),
        shippingAddress: { address, city, zip },
      }, { headers });

      const { data: payment } = await axios.post('/api/orders/create-payment-intent', { orderId: order._id }, { headers });

      const { loadStripe } = await import('@stripe/stripe-js');
      const stripe = await loadStripe('pk_test_YOUR_PUBLISHABLE_KEY');

      const { error } = await stripe.confirmCardPayment(payment.clientSecret, {
        payment_method: { card: { number: '4242424242424242', exp_month: 12, exp_year: 2026, cvc: '123' } },
      });

      if (error) {
        setMessage(error.message);
      } else {
        await axios.put('/api/orders/pay', { paymentIntentId: order.paymentIntentId }, { headers });
        clearCart();
        setMessage('Payment successful! Your order is placed.');
        setTimeout(() => navigate('/shop'), 2000);
      }
    } catch (err) {
      setMessage(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page checkout-page">
      <h2>Checkout</h2>
      <div className="checkout-layout">
        <div className="checkout-summary">
          <h3>Order Summary</h3>
          {cart.map((item) => (
            <div key={item._id} className="checkout-item">
              <span>{item.name} x{item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <hr />
          <p><strong>Total: ${cartTotal.toFixed(2)}</strong></p>
        </div>
        <form onSubmit={handleSubmit} className="checkout-form">
          <h3>Shipping Details</h3>
          <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} required />
          <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} required />
          <input type="text" placeholder="ZIP Code" value={zip} onChange={(e) => setZip(e.target.value)} required />
          <p className="note">Test card: 4242 4242 4242 4242</p>
          <button type="submit" className="btn primary" disabled={loading}>{loading ? 'Processing...' : 'Pay Now'}</button>
          {message && <p className={message.includes('successful') ? 'success' : 'error'}>{message}</p>}
        </form>
      </div>
    </div>
  );
}
