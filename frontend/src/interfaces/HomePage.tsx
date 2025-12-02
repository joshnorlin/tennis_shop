
import pink_racket from '../assets/pink_racket.jpg';
import tennis_bicycle from '../assets/tennis_bicycle.jpg';
import tennis_shoes from '../assets/tennis_shoes.jpg';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router';
const featuredProducts = [
  { id: "6", src: pink_racket, name: "Pink Racket", price: 25 },
  { id: "8", src: tennis_bicycle, name: "Tennis Bicycle", price: 150 },
  { id: "9", src: tennis_shoes, name: "Tennis Shoes", price: 60 },
];



export default function HomePage() {
  const { addToCart } = useCart();
  const { loggedIn } = useAuth();
  const navigate = useNavigate();

  const handleAddToCart = (featuredProduct: typeof featuredProducts[0]) => {
    if (!loggedIn) {
      navigate('/login');
      return;
    }
    addToCart({
      id: featuredProduct.id,
      name: featuredProduct.name,
      price: featuredProduct.price,
      quantity: 1,
      image: featuredProduct.src,
    });
    alert(`${featuredProduct.name} added to cart!`);
  };

  const productCard = (product: typeof featuredProducts[0]) => {
    return (
      <div style={{ backgroundColor: 'white', border: '1px solid #ddd', borderRadius: '8px', padding: '1rem', margin: '1rem', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
        <img src={product.src} alt={product.name} style={{ width: 250, height: 'auto' }} />
        <div>
          <h3>{product.name}</h3>
          <h3>${product.price}</h3>
          {loggedIn && (
            <button onClick={() => handleAddToCart(product)}>Add to cart</button>
          )}
        </div>
      </div>
    );
  }
  
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1 style={{ fontSize: '2.5rem' }}>Welcome to Pro Racketeers</h1>
      <p style={{ fontSize: '1.2rem' }}>
        At Pro Racketeers, we are dedicated to providing tennis enthusiasts with the finest products and materials. Our commitment to excellence ensures that you have access to top-quality gear that enhances your game and experience on the court. We believe that every player deserves the best, and we strive to deliver just that. Whether you're a beginner or a seasoned pro, our selection is tailored to meet your needs and elevate your performance.
      </p>
      
      <h2 style={{ fontSize: '2rem' }}>Featured Products</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {featuredProducts.map(product => productCard(product))}
      </div>

      <h2 style={{ fontSize: '2rem' }}>Hot Deals</h2>
      <p style={{ fontSize: '1.2rem' }}>
        Don't miss out on our exclusive hot deals! Check back often for discounts on your favorite tennis gear and accessories. Whether you're a beginner or a seasoned pro, we have something for everyone at unbeatable prices. Our hot deals section is updated regularly, so make sure to take advantage of these limited-time offers and save big on your next purchase!
      </p>

      <h2 style={{ fontSize: '2rem', marginTop: '2rem' }}>Our Location</h2>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap', margin: '1rem' }}>
        <div style={{ flex: '1', minWidth: '300px', maxWidth: '500px', textAlign: 'left' }}>
          <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>
            <strong>Address:</strong><br />
            123 Tennis Ave<br />
            Sportstown, NY 10001<br />
            United States
          </p>
          <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>
            <strong>Hours:</strong><br />
            Monday - Friday: 9 AM - 6 PM<br />
            Saturday: 10 AM - 4 PM<br />
            Sunday: Closed
          </p>
          <p style={{ fontSize: '1.2rem' }}>
            Our friendly staff is always ready to assist you in finding the perfect gear to suit your playing style. We look forward to welcoming you to our store!
          </p>
        </div>
        <div style={{ flex: '1', minWidth: '300px', maxWidth: '500px', height: '300px', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <iframe 
            width="100%" 
            height="100%" 
            style={{ border: 0 }}
            loading="lazy"
            src="https://maps.google.com/maps?width=100%25&amp;height=300&amp;hl=en&amp;q=New%20York%20City+(Pro%20Racketeers)&amp;t=&amp;z=13&amp;ie=UTF8&amp;iwloc=B&amp;output=embed">
          </iframe>
        </div>
      </div>

      <h2 style={{ fontSize: '2rem', marginTop: '2rem' }}>Contact Us</h2>
      <p style={{ fontSize: '1.2rem' }}>
        Have questions? Reach out to us at <a href="mailto:info@proracketeers.com">info@proracketeers.com</a> or call us at (123) 456-7890. We are here to help you with all your tennis needs! Whether you need assistance with product selection, have inquiries about your order, or just want to chat about tennis, don't hesitate to get in touch. Your satisfaction is our priority!
      </p>
    </div>
  );
}