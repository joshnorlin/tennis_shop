import tennis_lessons from '../assets/tennis_lessons.jpg';
import tennis_ball_mountain from '../assets/tennis_ball_heap.jpg';

export default function AboutPage() {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
      <h1 style={{ fontSize: '2.5rem', color: '#1a472a', marginBottom: '2rem', textAlign: 'center' }}>About Pro Racketeers</h1>
      
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', marginBottom: '3rem', flexWrap: 'wrap' }}>
        <div style={{ flex: '1', minWidth: '300px' }}>
          <p style={{ fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '1.5rem' }}>
            Our story begins with our parents, who immigrated from Italy with a dream in their hearts and a passion for tennis. They arrived in the United States with little more than hope and determination, believing that the sport they loved could bring joy and unity to people from all walks of life. They envisioned a world where tennis was not just a game for the elite, but a beloved pastime for everyone, regardless of age or background.
          </p>
        </div>
        <div style={{ flex: '1', minWidth: '300px', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
          <img src={tennis_lessons} alt="Tennis Lessons" style={{ width: '100%', height: 'auto', display: 'block' }} />
        </div>
      </div>

      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', marginBottom: '3rem', flexWrap: 'wrap', flexDirection: 'row-reverse' }}>
        <div style={{ flex: '1', minWidth: '300px' }}>
          <p style={{ fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '1.5rem' }}>
            With hard work and perseverance, they opened a small tennis shop in their community, offering affordable equipment and lessons to aspiring players. Their dedication to the sport and their genuine desire to share their love for tennis quickly gained the trust and admiration of local families. They organized community events, free clinics, and friendly tournaments, fostering a sense of camaraderie and sportsmanship among players of all skill levels. Their shop became a hub for tennis enthusiasts, where friendships blossomed and lifelong memories were made.
          </p>
        </div>
        <div style={{ flex: '1', minWidth: '300px', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
          <img src={tennis_ball_mountain} alt="Tennis Equipment" style={{ width: '100%', height: 'auto', display: 'block' }} />
        </div>
      </div>

      <div style={{ backgroundColor: '#f5f5f5', padding: '2rem', borderRadius: '8px', marginTop: '2rem' }}>
        <h2 style={{ fontSize: '1.8rem', color: '#1a472a', marginBottom: '1.5rem', textAlign: 'center' }}>Our Mission</h2>
        <p style={{ fontSize: '1.2rem', lineHeight: '1.8', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
          Today, Pro Racketeers stands as a testament to their vision and legacy. We continue to honor their commitment to making tennis accessible to everyone. Our mission is to provide high-quality products and exceptional service while nurturing the same spirit of community that our parents instilled in us. We believe that tennis has the power to bring people together, and we are proud to carry on their dream, ensuring that the love for the game lives on for generations to come.
        </p>
      </div>

      <div style={{ marginTop: '3rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.8rem', color: '#1a472a', marginBottom: '1.5rem' }}>Visit Us Today</h2>
        <p style={{ fontSize: '1.2rem', lineHeight: '1.8' }}>
          Come experience the Pro Racketeers difference. Whether you're a beginner or a seasoned player, we're here to help you find the perfect equipment and share our passion for tennis with you.
        </p>
        <button style={{
          backgroundColor: '#2e7d32',
          color: 'white',
          padding: '1rem 2rem',
          fontSize: '1.1rem',
          border: 'none',
          borderRadius: '4px',
          marginTop: '1rem',
          cursor: 'pointer',
          transition: 'background-color 0.3s ease'
        }}
        onClick={() => window.location.href = '/contact-us'}>
          Contact Us
        </button>
      </div>
    </div>
  );
}