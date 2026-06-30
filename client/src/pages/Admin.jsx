import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export default function Admin() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };

  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [tab, setTab] = useState('stats');

  const [form, setForm] = useState({ name: '', description: '', price: '', category: '', gender: 'unisex', stock: '', image: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    if (!user || user.role !== 'admin') return navigate('/');
    fetchData();
  }, [user, navigate]);

  const fetchData = async () => {
    try {
      const [s, u, o, p] = await Promise.all([
        axios.get('/api/admin/stats', { headers }),
        axios.get('/api/admin/users', { headers }),
        axios.get('/api/admin/orders', { headers }),
        axios.get('/api/products'),
      ]);
      setStats(s.data);
      setUsers(u.data);
      setOrders(o.data);
      setProducts(p.data);
    } catch {}
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`/api/products/${editingId}`, form, { headers });
      } else {
        await axios.post('/api/products', form, { headers });
      }
      setForm({ name: '', description: '', price: '', category: '', gender: 'unisex', stock: '', image: '' });
      setEditingId(null);
      fetchData();
    } catch {}
  };

  const editProduct = (p) => {
    setForm({ name: p.name, description: p.description, price: p.price, category: p.category, gender: p.gender, stock: p.stock, image: p.image || '' });
    setEditingId(p._id);
  };

  const deleteProduct = async (id) => {
    if (!confirm('Delete product?')) return;
    await axios.delete(`/api/products/${id}`, { headers });
    fetchData();
  };

  const updateOrderStatus = async (id, status) => {
    await axios.put(`/api/admin/orders/${id}/status`, { status }, { headers });
    fetchData();
  };

  if (!stats) return <div className="page"><p>Loading...</p></div>;

  return (
    <div className="page admin-page">
      <h2>Admin Panel</h2>
      <div className="admin-tabs">
        <button className={tab === 'stats' ? 'active' : ''} onClick={() => setTab('stats')}>Dashboard</button>
        <button className={tab === 'products' ? 'active' : ''} onClick={() => setTab('products')}>Products</button>
        <button className={tab === 'orders' ? 'active' : ''} onClick={() => setTab('orders')}>Orders</button>
        <button className={tab === 'users' ? 'active' : ''} onClick={() => setTab('users')}>Users</button>
      </div>

      {tab === 'stats' && (
        <div className="stats-grid">
          <div className="stat-card"><h3>{stats.totalProducts}</h3><p>Products</p></div>
          <div className="stat-card"><h3>{stats.totalOrders}</h3><p>Orders</p></div>
          <div className="stat-card"><h3>{stats.totalUsers}</h3><p>Users</p></div>
          <div className="stat-card"><h3>${stats.revenue.toFixed(2)}</h3><p>Revenue</p></div>
        </div>
      )}

      {tab === 'products' && (
        <div>
          <form className="product-form" onSubmit={handleProductSubmit}>
            <h3>{editingId ? 'Edit Product' : 'Add Product'}</h3>
            <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
            <input placeholder="Price" type="number" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
            <input placeholder="Category (e.g. Floral, Woody)" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required />
            <select value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })}>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="unisex">Unisex</option>
            </select>
            <input placeholder="Stock" type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} required />
            <input placeholder="Image URL (optional)" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
            <button type="submit" className="btn primary">{editingId ? 'Update' : 'Add'} Product</button>
            {editingId && <button type="button" className="btn secondary" onClick={() => { setEditingId(null); setForm({ name: '', description: '', price: '', category: '', gender: 'unisex', stock: '', image: '' }); }}>Cancel</button>}
          </form>
          <div className="admin-list">
            {products.map((p) => (
              <div key={p._id} className="admin-row">
                <span>{p.name} - ${p.price} ({p.stock} in stock)</span>
                <div>
                  <button className="btn small" onClick={() => editProduct(p)}>Edit</button>
                  <button className="btn danger small" onClick={() => deleteProduct(p._id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'orders' && (
        <div className="admin-list">
          {orders.map((o) => (
            <div key={o._id} className="admin-row">
              <div>
                <strong>#{o._id.slice(-6)}</strong> - ${o.total} - {o.status} - {o.user?.name || 'N/A'}
              </div>
              <select value={o.status} onChange={(e) => updateOrderStatus(o._id, e.target.value)}>
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
              </select>
            </div>
          ))}
        </div>
      )}

      {tab === 'users' && (
        <div className="admin-list">
          {users.map((u) => (
            <div key={u._id} className="admin-row">
              <span>{u.name} - {u.email} ({u.role})</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
