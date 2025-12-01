import { NavLink } from "react-router"

export default function Footer() {
  const navLink = (url: string, label: string) => {
    return (
      <NavLink
        to={url}
      >{label}</NavLink>
    )
  }

  return (
    <footer>
      <div>
        {navLink("about", "About")}
        {navLink("privacy-policy", "Privacy Policy")}
      </div>
    </footer>
  )
}