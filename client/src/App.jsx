import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Admin from './pages/Admin';
import { Link } from 'react-router-dom';

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-col">
            <h4>SMELL&TOL</h4>
            <p>Premium fragrances crafted by master perfumers. Made for those who appreciate the finer things in life.</p>
          </div>
          <div className="footer-col">
            <h4>SHOP</h4>
            <Link to="/shop?gender=male">Men</Link>
            <Link to="/shop?gender=female">Women</Link>
            <Link to="/shop?gender=unisex">Unisex</Link>
            <Link to="/shop">All Collections</Link>
          </div>
          <div className="footer-col">
            <h4>SUPPORT</h4>
            <Link to="/cart">Cart</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
          <div className="footer-col">
            <h4>FOLLOW US</h4>
            <div className="social-links">
              <a href="#">Instagram</a>
              <a href="#">Facebook</a>
              <a href="#">Twitter</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 SMELL&TOL. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
