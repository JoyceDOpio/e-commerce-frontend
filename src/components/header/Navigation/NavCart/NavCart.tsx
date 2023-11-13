import { useState } from "react"
import { useLocation } from "react-router-dom"
import CartDropdown from "./CartDropdown"
import CartIcon from "./CartIcon"
import { CartProduct } from "../../../../types"

export default function NavCart(props: { products: CartProduct[] }) {
  const { products } = props
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false)
  const productsTotal = products.reduce(
    (sum, product) => sum + product.quantity,
    0
  )
  const location = useLocation()

  const handleOnMouseOver = () => {
    if (location.pathname !== "/cart") setDropdownIsOpen(true)
  }

  const handleOnMouseOut = () => {
    setDropdownIsOpen(false)
  }

  const handleOnGoToCartClick = () => {
    setDropdownIsOpen((prevState) => !prevState)
  }

  return (
    <div
      className="NavCart"
      onMouseOver={handleOnMouseOver}
      onMouseOut={handleOnMouseOut}
    >
      <CartIcon productsTotal={productsTotal} />
      {dropdownIsOpen ? (
        <CartDropdown
          products={products}
          productsTotal={productsTotal}
          onGoToCartClick={handleOnGoToCartClick}
        />
      ) : null}
    </div>
  )
}
