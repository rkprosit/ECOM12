import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();
  const activeGender = searchParams.get('gender') || 'all';

  useEffect(() => {
    const params = new URLSearchParams();
    const gender = searchParams.get('gender');
    const category = searchParams.get('category');
    if (gender) params.set('gender', gender);
    if (category) params.set('category', category);
    axios.get(`/api/products?${params.toString()}`)
      .then(({ data }) => setProducts(data))
      .catch(() => {});
  }, [searchParams]);

  return (
    <div className="shop-page">
      <div className="shop-banner">
        <img src="https://images.pexels.com/photos/32816853/pexels-photo-32816853.jpeg" alt="Perfume Collection" className="shop-banner-img" />
        <div className="shop-banner-overlay"></div>
        <div className="shop-banner-content">
          <h2>
            {activeGender === 'male' ? "Men's Perfumes" :
             activeGender === 'female' ? "Women's Perfumes" :
             activeGender === 'unisex' ? 'Unisex Perfumes' : 'All Collections'}
          </h2>
          <p>Discover your perfect fragrance from our curated collection</p>
        </div>
      </div>

      <div className="page">
        <div className="shop-tabs">
          <Link to="/shop" className={`shop-tab ${activeGender === 'all' ? 'active' : ''}`}>All</Link>
          <Link to="/shop?gender=male" className={`shop-tab ${activeGender === 'male' ? 'active' : ''}`}>Men</Link>
          <Link to="/shop?gender=female" className={`shop-tab ${activeGender === 'female' ? 'active' : ''}`}>Women</Link>
          <Link to="/shop?gender=unisex" className={`shop-tab ${activeGender === 'unisex' ? 'active' : ''}`}>Unisex</Link>
        </div>

        {products.length === 0 ? (
          <p className="no-products">No products found in this category.</p>
        ) : (
          <div className="product-grid">
            {products.map((p) => <ProductCard key={p._id} product={p} />)}
          </div>
        )}
      </div>
    </div>
  );
}
