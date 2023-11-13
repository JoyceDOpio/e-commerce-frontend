import logo from "../../assets/images/logo.png"
import { Link } from "react-router-dom"

export default function Logo() {
  return (
    <div className="Logo">
      <Link to="/">
        <img src={logo} alt="logo" />
      </Link>
    </div>
  )
}
