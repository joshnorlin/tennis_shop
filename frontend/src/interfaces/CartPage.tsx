import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h1>Shopping Cart</h1>
        <p style={{ fontSize: '1.1rem' }}>Your cart is empty</p>
        <button onClick={() => navigate('/products')} style={{ padding: '0.5rem 1rem', fontSize: '1rem', cursor: 'pointer' }}>
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
      <h1>Shopping Cart</h1>
      
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '2rem' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #333' }}>
              <th style={{ textAlign: 'left', padding: '1rem' }}>Product</th>
              <th style={{ textAlign: 'center', padding: '1rem' }}>Price</th>
              <th style={{ textAlign: 'center', padding: '1rem' }}>Quantity</th>
              <th style={{ textAlign: 'center', padding: '1rem' }}>Subtotal</th>
              <th style={{ textAlign: 'center', padding: '1rem' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.id} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <img src={item.image} alt={item.name} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px' }} />
                  <span>{item.name}</span>
                </td>
                <td style={{ textAlign: 'center', padding: '1rem' }}>${item.price.toFixed(2)}</td>
                <td style={{ textAlign: 'center', padding: '1rem' }}>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                    style={{ width: '60px', padding: '0.25rem', fontSize: '1rem' }}
                  />
                </td>
                <td style={{ textAlign: 'center', padding: '1rem' }}>${(item.price * item.quantity).toFixed(2)}</td>
                <td style={{ textAlign: 'center', padding: '1rem' }}>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    style={{ padding: '0.5rem 1rem', backgroundColor: '#ff6b6b', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', borderTop: '2px solid #333', paddingTop: '1rem' }}>
        <div>
          <h2 style={{ margin: '0' }}>Total: ${getTotalPrice().toFixed(2)}</h2>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button
            onClick={() => clearCart()}
            style={{ padding: '0.75rem 1.5rem', fontSize: '1rem', backgroundColor: '#ff6b6b', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer' }}
          >
            Clear Cart
          </button>
          <button
            onClick={() => navigate('/checkout')}
            style={{ padding: '0.75rem 1.5rem', fontSize: '1rem', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>

      <button
        onClick={() => navigate('/products')}
        style={{ padding: '0.5rem 1rem', fontSize: '1rem', cursor: 'pointer' }}
      >
        Continue Shopping
      </button>
    </div>
  );
}
