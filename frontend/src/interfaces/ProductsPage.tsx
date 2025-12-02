import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import tennis_ball_mountain from '../assets/tennis_ball_heap.jpg';
import one_tennis_ball from '../assets/one_tennis_ball.jpg';
import pink_racket from '../assets/pink_racket.jpg';
import tennis_bicycle from '../assets/tennis_bicycle.jpg';
import tennis_lessons from '../assets/tennis_lessons.jpg';
import tennis_shoes from '../assets/tennis_shoes.jpg';
import tennis_table from '../assets/tennis_table.jpg';
import three_pack from '../assets/three_pack.jpg';
import three_pink_ones from '../assets/three_pink_ones.jpg';
import white_and_black_racket from '../assets/white_and_black_racket.jpg';

const products = [
  { id: "1", src: one_tennis_ball, name: "One Tennis Ball", price: 2 },
  { id: "2", src: three_pack, name: "Three Pack", price: 5 },
  { id: "3", src: three_pink_ones, name: "Pink Three Pack", price: 5 },
  { id: "4", src: tennis_ball_mountain, name: "Ball Mountain", price: 10 },
  { id: "5", src: white_and_black_racket, name: "Black Racket", price: 30 },
  { id: "6", src: pink_racket, name: "Pink Racket", price: 25 },
  { id: "7", src: tennis_lessons, name: "Lessons with Gary", price: 30 },
  { id: "8", src: tennis_bicycle, name: "Tennis Bicycle", price: 150 },
  { id: "9", src: tennis_shoes, name: "Tennis Shoes", price: 60 },
  { id: "10", src: tennis_table, name: "Table Tennis", price: 200 },
];

export default function ProductsPage() {
  const { loggedIn } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (product: typeof products[0]) => {
    if (!loggedIn) {
      navigate('/login');
      return;
    }
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.src,
    });
  };

  const productCard = (product: typeof products[0]) => {
    return (
      <div style={{ backgroundColor: 'white', border: '1px solid #ddd', borderRadius: '8px', padding: '1rem', margin: '1rem', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
        <img src={product.src} alt={product.name} style={{ width: 250, height: 'auto' }} />
        <div>
          <h3>{product.name}</h3>
          <h3>${product.price}</h3>
          <button onClick={() => handleAddToCart(product)}>Add to cart</button>
        </div>
      </div>
    );
  }
  
  return (
    <div style={{ textAlign: 'center' }}>
      <h1 style={{ margin: '30px 0 0 0' }}>Products</h1>
      <p style={{ fontSize: '1.2rem' }}>
        At Pro Racketeers, we are committed to excellence, offering only the finest materials and products for tennis enthusiasts. Explore our carefully curated selection to elevate your game.
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {products.map(product => productCard(product))}
      </div>
    </div>
  );
}