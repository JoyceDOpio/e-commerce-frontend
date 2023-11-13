import { CartProduct } from "../../../../types"
import CartProductList from "./CartProductList"

type CartDropdownProps = {
  products: CartProduct[]
  productsTotal: number
  onGoToCartClick: () => void
}

export default function CartDropdown(props: CartDropdownProps) {
  const { products, productsTotal, onGoToCartClick } = props

  return (
    <div className="CartDropdown">
      <div className="total-info-container">
        <span className="title">
          <h4>Your cart</h4>
        </span>
        <span className="total">TOTAL CART VALUE</span>
        <span className="price">
          <h3>
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "PLN"
            }).format(
              Math.round(
                products.reduce(
                  (sum, product) => sum + product.quantity * product.price,
                  0
                )
              )
            )}
          </h3>
        </span>
      </div>
      <CartProductList
        products={products}
        productsTotal={productsTotal}
        onClickCloseDropdown={onGoToCartClick}
      />
    </div>
  )
}
