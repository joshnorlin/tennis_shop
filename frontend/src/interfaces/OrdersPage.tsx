import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

interface OrderItem {
  product_id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface Order {
  id: number;
  total_price: number;
  status: string;
  created_at: string;
  items: OrderItem[];
}

export default function OrdersPage() {
  const { loggedIn } = useAuth();
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const BASE_URL = 'http://localhost/tennis_shop/backend';

  useEffect(() => {
    if (!loggedIn) return;
    setLoading(true);
    fetch(`${BASE_URL}/get_orders.php`, { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setOrders(data.orders || []);
        else setError(data.message || 'Failed to load orders');
      })
      .catch((err) => setError(String(err)))
      .finally(() => setLoading(false));
  }, [loggedIn]);

  if (!loggedIn) {
    return (
      <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '2rem', textAlign: 'center' }}>
        <h1>Orders</h1>
        <p>You must be logged in to view your orders. <a href="/login">Login</a></p>
      </div>
    );
  }

  if (loading) return <div style={{ textAlign: 'center' }}>Loading orders...</div>;
  if (error) return <div style={{ textAlign: 'center', color: 'red' }}>Error: {error}</div>;
  if (!orders || orders.length === 0) return <div style={{ textAlign: 'center', padding: '2rem' }}><h2>No orders found</h2></div>;

  return (
    <div style={{ maxWidth: '1000px', margin: '2rem auto', padding: '1rem' }}>
      <h1>Your Orders</h1>
      {orders.map((order) => (
        <div key={order.id} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '1rem', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <strong>Order #{order.id}</strong>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>{order.created_at}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div><strong>Total: ${order.total_price.toFixed(2)}</strong></div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>{order.status}</div>
            </div>
          </div>
          <div style={{ marginTop: '1rem' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #ddd' }}>
                  <th style={{ textAlign: 'left', padding: '0.5rem' }}>Product</th>
                  <th style={{ textAlign: 'center', padding: '0.5rem' }}>Price</th>
                  <th style={{ textAlign: 'center', padding: '0.5rem' }}>Quantity</th>
                  <th style={{ textAlign: 'center', padding: '0.5rem' }}>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((it, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #f0f0f0' }}>
                    <td style={{ padding: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      {it.image && <img src={it.image} alt={it.name} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} />}
                      <span>{it.name}</span>
                    </td>
                    <td style={{ textAlign: 'center', padding: '0.5rem' }}>${it.price.toFixed(2)}</td>
                    <td style={{ textAlign: 'center', padding: '0.5rem' }}>{it.quantity}</td>
                    <td style={{ textAlign: 'center', padding: '0.5rem' }}>${(it.price * it.quantity).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}
