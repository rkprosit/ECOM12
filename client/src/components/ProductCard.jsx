import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="product-card">
      <div className="product-badge">{product.gender}</div>
      <div className="product-img" style={{ background: product.image ? `url(${product.image}) center/cover no-repeat` : undefined }}>
        {!product.image && <span className="product-emoji">✨</span>}
      </div>
      <div className="product-info">
        <p className="product-category">{product.category}</p>
        <h3>{product.name}</h3>
        <p className="product-price">&#8377;{Number(product.price).toFixed(2)}</p>
        <div className="product-actions">
          <button className="btn primary" onClick={() => addToCart(product)} disabled={product.stock <= 0}>
            {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </div>
  );
}
