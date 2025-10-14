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
  { src: one_tennis_ball, name: "One Tennis Ball", price: "$2" },
  { src: three_pack, name: "Three Pack", price: "$5" },
  { src: three_pink_ones, name: "Pink Three Pack", price: "$5" },
  { src: tennis_ball_mountain, name: "Ball Mountain", price: "$10" },
  { src: white_and_black_racket, name: "Black Racket", price: "$30" },
  { src: pink_racket, name: "Pink Racket", price: "$25" },
  { src: tennis_lessons, name: "Lessons with Gary", price: "$30" },
  { src: tennis_bicycle, name: "Tennis Bicycle", price: "$150" },
  { src: tennis_shoes, name: "Tennis Shoes", price: "$60" },
  { src: tennis_table, name: "Table Tennis", price: "$200" },
];

export default function ProductsPage() {
  const productCard = (src: string, name: string, price: string) => {
    return (
      <div style={{ backgroundColor: 'white', border: '1px solid #ddd', borderRadius: '8px', padding: '1rem', margin: '1rem', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
        <img src={src} alt={name} style={{ width: 250, height: 'auto' }} />
        <div>
          <h3>{name}</h3>
          <h3>{price}</h3>
          <button>Add to cart</button>
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
        {products.map(product => productCard(product.src, product.name, product.price))}
      </div>
    </div>
  );
}