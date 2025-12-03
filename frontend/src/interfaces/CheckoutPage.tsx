import { useState } from "react";
import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function CheckoutPage() {
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const { user, loggedIn, logout } = useAuth();
  const { cart, clearCart, getTotalPrice } = useCart();
  const navigate = useNavigate();
  const BASE_URL = 'http://localhost/tennis_shop/backend';

  const handleLogout = async () => {
    await logout();
  };

  const handlePlaceOrder = async () => {
    try {
      const res = await fetch(`${BASE_URL}/create_order.php`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cart, total: getTotalPrice() }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        clearCart();
        setOrderSuccess(true);
      } else {
        console.error('Order failed', data);
        alert('Order failed: ' + (data.message || 'Unknown error'));
      }
    } catch (err) {
      console.error('Order request failed', err);
      alert('Order request failed, please try again later.');
    }
  };

  const handleBackToShop = () => {
    setOrderSuccess(false);
    navigate('/products');
  };

  if (!loggedIn || !user) {
    return (
      <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '2rem', textAlign: 'center' }}>
        <h1 style={{ color: '#1a472a', marginBottom: '1rem' }}>Checkout</h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
          You must be logged in to view your checkout. <a href="/login" style={{ color: '#2e7d32', fontWeight: 'bold' }}>Login here</a> or <a href="/register" style={{ color: '#2e7d32', fontWeight: 'bold' }}>register here</a>.
        </p>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '2rem', textAlign: 'center' }}>
        <h1 style={{ color: '#1a472a', marginBottom: '1rem' }}>Checkout</h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
          Your cart is empty. <a href="/products" style={{ color: '#2e7d32', fontWeight: 'bold' }}>Continue shopping</a> to add items.
        </p>
      </div>
    );
  }

  if (orderSuccess) {
    return (
      <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '2rem', textAlign: 'center', backgroundColor: '#e8f5e9', borderRadius: '8px', border: '2px solid #4caf50' }}>
        <h1 style={{ color: '#2e7d32', marginBottom: '1rem' }}>Order Confirmed! 🎉</h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#1b5e20' }}>
          Success! Your order is on its way!
        </p>
        <p style={{ fontSize: '1rem', marginBottom: '2rem', color: '#2e7d32' }}>
          Thank you for your purchase. Your items will be delivered soon.
        </p>
        <button
          onClick={handleBackToShop}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#4caf50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: 'bold'
          }}
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div style={{maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem'}}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{textAlign: 'center', marginBottom: '0', flex: 1}}>Checkout</h1>
        <div style={{ textAlign: 'right' }}>
          <p style={{ marginBottom: '0.5rem', fontSize: '0.95rem' }}><strong>{user.name || user.email}</strong></p>
          <button
            onClick={handleLogout}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#d32f2f',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '0.9rem'
            }}
          >
            Logout
          </button>
        </div>
      </div>
      
      
      {/* Shipping Information Form */}
      <section className="card" style={{marginBottom: '1.5rem'}}>
        <h2 style={{marginBottom: '0.5rem'}}>Shipping Information</h2>
        <p style={{fontSize: '0.9rem', marginBottom: '1.5rem'}}>Enter your shipping details below</p>
          
        <div>
          <label htmlFor="fullName">Full Name</label>
          <input type="text" id="fullName" placeholder="John Doe" required/>
        </div>
        
        <div>
          <label htmlFor="email">Email Address</label>
          <input type="email" id="email" placeholder="john@example.com" required/>
        </div>
        
        <div>
          <label htmlFor="address">Street Address</label>
          <input type="text" id="address" placeholder="123rd Maple St." required/>
        </div>

        <div style={{display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '1rem'}}>
          <div>
            <label htmlFor="city">City</label>
            <input type="text" id="city" placeholder="New York" required/>
          </div>

          <div>
            <label htmlFor="state">State</label>
            <input type="text" id="state" placeholder="NY" required/>
          </div>

          <div>
            <label htmlFor="zip">ZIP Code</label>
            <input type="text" id="zip" placeholder="10001" required/>
          </div>
        </div>

        <div>
          <label htmlFor="country">Country</label>
          <input type="text" id="country" placeholder="United States" required/>
        </div>
      </section>
    
      {/* Payment Method */}
      <section className="card" style={{marginBottom: '2rem'}}>
        <h2 style={{marginBottom: '0.5rem'}}>Payment Method</h2>
        <p style={{fontSize: '0.9rem', marginBottom: '1.5rem'}}>Select your payment method</p>

        <div>
          <label htmlFor="cardName">Name on Card</label>
          <input type="text" id="cardName" placeholder="John Doe" required/>
        </div>

        <div>
          <label htmlFor="cardNumber">Card Number</label>
          <input type="text" id="cardNumber" placeholder="1234 5678 9012 3456" maxLength={19} required/>
          <p style={{fontSize: '0.85rem', marginTop: '0.25rem', marginBottom: '0'}}>Enter your 16-digit card number</p>
        </div>

        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem'}}>
          <div>
            <label htmlFor="month">Month</label>
            <select id="month" required>
              <option value="">MM</option>
              {Array.from({length: 12}, (_, i) => (
                <option key={i+1} value={(i+1).toString().padStart(2, '0')}>{(i+1).toString().padStart(2, '0')}</option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="year">Year</label>
          <select id="year" required>
            <option value="">YYYY</option>
            {Array.from({length: 10}, (_, i) => {
              const year = new Date().getFullYear() + i;
              return <option key={year} value={year}>{year}</option>;
            })}
          </select>
        </div>
        <div>
          <label htmlFor="cvv">CVV</label>
          <input type="text" id="cvv" placeholder="123" maxLength={4} required/>
        </div>
      </section>

      {/* Billing Address */}
      <section className="card" style={{marginBottom: '2rem'}}>
        <h2 style={{marginBottom: '0.5rem'}}>Billing Address</h2>
        <p style={{fontSize: '0.9rem', marginBottom: '1.5rem'}}>Enter your billing address associated with your payment method</p>
        
        <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
          <input type="checkbox" id="sameAsShipping" checked={sameAsShipping} onChange={(e) => setSameAsShipping(e.target.checked)}style={{width: 'auto', margin: '0'}}/>
          <label htmlFor="sameAsShipping" style={{marginBottom: '0', fontWeight: 'normal'}}>Same as shipping address</label>
        </div>
      

      {!sameAsShipping && (
        <>
        <div>
          <label htmlFor="fullName">Full Name</label>
          <input type="text" id="fullName" placeholder="John Doe" required/>
        </div>
        
        <div>
          <label htmlFor="email">Email Address</label>
          <input type="email" id="email" placeholder="john@example.com" required/>
        </div>
        
        <div>
          <label htmlFor="address">Street Address</label>
          <input type="text" id="address" placeholder="123rd Maple St." required/>
        </div>

        <div style={{display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '1rem'}}>
          <div>
            <label htmlFor="city">City</label>
            <input type="text" id="city" placeholder="New York" required/>
          </div>

          <div>
            <label htmlFor="state">State</label>
            <input type="text" id="state" placeholder="NY" required/>
          </div>

          <div>
            <label htmlFor="zip">ZIP Code</label>
            <input type="text" id="zip" placeholder="10001" required/>
          </div>
        </div>

        <div>
          <label htmlFor="country">Country</label>
          <input type="text" id="country" placeholder="United States" required/>
        </div>
        </>
      )}

      </section>

      {/* Order Summary */}
      <section className="card" style={{marginBottom: '2rem'}}>
        <h2 style={{marginBottom: '0.5rem'}}>Order Summary</h2>
        <p style={{fontSize: '0.9rem', marginBottom: '1.5rem'}}>Review your order before proceeding to payment</p>

        <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem'}}>
          <span>Item Total</span>
          <span>${getTotalPrice().toFixed(2)}</span>
        </div>

      </section>

      {/* Place Order Button */}
      <div style={{display: 'flex', gap: '1rem', justifyContent: 'center'}}>
        <button onClick={handlePlaceOrder} type="submit" style={{minWidth: '150px'}}>Place Order</button>
        <button type="button" style={{minWidth: '150px', backgroundColor: '#ddd', color: '#333'}}>Cancel</button>
      </div>
    </div>
  )
}