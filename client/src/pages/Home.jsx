import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [men, setMen] = useState([]);
  const [women, setWomen] = useState([]);

  useEffect(() => {
    axios.get('/api/products').then(({ data }) => {
      setFeatured(data.slice(0, 4));
      setMen(data.filter(p => p.gender === 'male').slice(0, 4));
      setWomen(data.filter(p => p.gender === 'female').slice(0, 4));
    }).catch(() => {});
  }, []);

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <span className="hero-subtitle">PREMIUM FRAGRANCES</span>
          <h1>Discover Your Signature Scent</h1>
          <p>Crafted by master perfumers in France. Made for those who appreciate the finer things.</p>
          <Link to="/shop" className="btn primary large">Explore Collection</Link>
        </div>
        <div className="hero-visual">
          <div className="hero-perfume"></div>
        </div>
      </section>

      <section className="features-bar">
        <div className="feature-item">
          <span className="feature-icon">✓</span>
          <div><strong>100% ORIGINAL</strong><p>All products are authentic</p></div>
        </div>
        <div className="feature-item">
          <span className="feature-icon">↩</span>
          <div><strong>7 DAY RETURN</strong><p>Hassle free returns</p></div>
        </div>
        <div className="feature-item">
          <span className="feature-icon">🚚</span>
          <div><strong>FREE SHIPPING</strong><p>On all orders</p></div>
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <h2>Featured Fragrances</h2>
          <Link to="/shop" className="view-all">View All →</Link>
        </div>
        <div className="product-grid">
          {featured.map((p) => <ProductCard key={p._id} product={p} />)}
        </div>
      </section>

      <section className="section categories-section">
        <h2>Shop by Category</h2>
        <div className="category-grid">
          <Link to="/shop?gender=male" className="category-card cat-men">
            <span>For Him</span>
            <p>Explore Men's Collection</p>
          </Link>
          <Link to="/shop?gender=female" className="category-card cat-women">
            <span>For Her</span>
            <p>Explore Women's Collection</p>
          </Link>
          <Link to="/shop?gender=unisex" className="category-card cat-unisex">
            <span>Unisex</span>
            <p>Explore Unisex Collection</p>
          </Link>
        </div>
      </section>

      <section className="section newsletter-section">
        <div className="newsletter-card">
          <h2>Join the SKINN Club</h2>
          <p>Subscribe to receive updates, access to exclusive deals, and more.</p>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Enter your email" required />
            <button type="submit" className="btn primary">Subscribe</button>
          </form>
        </div>
      </section>
    </div>
  );
}
