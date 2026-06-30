import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="nav-top">
        <div className="nav-container">
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            <span></span><span></span><span></span>
          </button>
          <Link to="/" className="nav-logo">SMELL&TOL</Link>
          <div className="nav-icons">
            <Link to="/shop" className="nav-icon-link">Search</Link>
            {user ? (
              <>
                <span className="nav-user">{user.name}</span>
                {user.role === 'admin' && <Link to="/admin" className="nav-icon-link">Admin</Link>}
                <button onClick={handleLogout} className="btn-link nav-icon-link">Logout</button>
              </>
            ) : (
              <Link to="/login" className="nav-icon-link">Login</Link>
            )}
            <Link to="/cart" className="nav-icon-link cart-icon">Cart ({cartCount})</Link>
          </div>
        </div>
      </div>
      <div className={`nav-bottom ${menuOpen ? 'open' : ''}`}>
        <div className="nav-container">
          <Link to="/shop?gender=male" className="nav-cat-link" onClick={() => setMenuOpen(false)}>MEN</Link>
          <Link to="/shop?gender=female" className="nav-cat-link" onClick={() => setMenuOpen(false)}>WOMEN</Link>
          <Link to="/shop" className="nav-cat-link" onClick={() => setMenuOpen(false)}>COLLECTIONS</Link>
          <Link to="/shop?category=Deodorant" className="nav-cat-link" onClick={() => setMenuOpen(false)}>DEODORANTS</Link>
          {!user && <Link to="/register" className="nav-cat-link" onClick={() => setMenuOpen(false)}>REGISTER</Link>}
        </div>
      </div>
    </nav>
  );
}
