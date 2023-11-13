import { Link } from "react-router-dom"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"

export default function CartIcon(props: { productsTotal: number }) {
  const { productsTotal } = props

  return (
    <Link to="/cart" className="CartIcon link">
      <ShoppingCartIcon className="icon link" />
      {productsTotal > 0 ? (
        <span className="products-number-sticker">{productsTotal}</span>
      ) : null}
    </Link>
  )
}
