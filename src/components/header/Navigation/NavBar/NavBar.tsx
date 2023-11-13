import "./NavBar.scss"
import NavCart from "../NavCart/NavCart"
import UserIcon from "../NavUser/UserIcon"
import { CartProduct } from "../../../../types"

export default function NavBar(props: { cartProducts: CartProduct[] }) {
  const { cartProducts } = props

  return (
    <div className="NavBar">
      <NavCart products={cartProducts} />
      <UserIcon />
    </div>
  )
}
