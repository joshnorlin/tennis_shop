import { Link, NavLink } from "react-router"
import racket from "../assets/racket.png"
import { useAuth } from "../context/AuthContext"
import { useCart } from "../context/CartContext"

export default function Header() {
  const auth = useAuth();
  const { loggedIn, user, logout, loading } = auth;
  const { getItemCount } = useCart();

  const navLink = (url: string, label: string) => {
    return (
      <NavLink
        to={url}
        className={({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? "active" : ""
        }
      >{label}</NavLink>
    )
  }

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Link style={{ textDecoration: 'none' }} to=""><h5 style={{ margin: '0' }}>Pro Racketeers</h5></Link>
        <img src={racket} height={25} width={25} alt="Tennis racket" />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        {navLink("", "Home")}
        {navLink("products", "Products")}
        {navLink("contact-us", "Contact Us")}
        {navLink("about", "About")}
        {navLink("checkout", "Checkout")}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {loggedIn && (
          <Link to="/cart" style={{ position: 'relative', textDecoration: 'none' }}>
            <div style={{ fontSize: '1.5rem' }}>🛒</div>
            {getItemCount() > 0 && (
              <span style={{ position: 'absolute', top: '-8px', right: '-8px', backgroundColor: '#d32f2f', color: 'white', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 'bold' }}>
                {getItemCount()}
              </span>
            )}
          </Link>
        )}
        {loading ? (
          <span style={{ fontSize: '0.9rem' }}>Loading...</span>
        ) : loggedIn ? (
          <>
            <span style={{ fontSize: '0.9rem' }}>Welcome, {user?.name || user?.email}</span>
            <button
              onClick={logout}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#d32f2f',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </>
        )}
      </div>
    </nav>
  )
}