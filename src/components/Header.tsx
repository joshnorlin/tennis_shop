import { NavLink } from "react-router"
import racket from "../assets/racket.png"

export default function Header() {
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
    <nav>
      <div>
        <h5>Pro Racketeers</h5>
        <img src={racket} height={25} width={25}alt="Tennis racket" />
      </div>
      <div>
        {navLink("", "Home")}
        {navLink("products", "Products")}
        {navLink("contact-us", "Contact Us")}
        {navLink("about", "About")}
        {navLink("checkout", "Checkout")}
      </div>
    </nav>
  )
}