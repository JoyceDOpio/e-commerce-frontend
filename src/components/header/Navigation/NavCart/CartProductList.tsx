import { Link } from "react-router-dom"
import { CartProduct } from "../../../../types"

type CartProductListProps = {
  products: CartProduct[]
  productsTotal: number
  onClickCloseDropdown: () => void
}

export default function CartProductList(props: CartProductListProps) {
  const { products, productsTotal, onClickCloseDropdown } = props

  if (productsTotal === 0) {
    return (
      <div className="cart-empty">
        <h2>Your cart is empty</h2>
      </div>
    )
  }

  return (
    <div className="cart-not-empty">
      <div className="cart-items">
        {products.map((product) => {
          return (
            <div key={product.id} className="cart-item">
              <div className="image-container">
                <img src={product.image} alt={product.title} />
              </div>
              <div className="title">
                {product.quantity} x {product.title}
              </div>
              <div className="price">
                <h4>
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "PLN"
                  }).format(
                    Math.round(
                      products.reduce(
                        (sum, product) =>
                          sum + product.quantity * product.price,
                        0
                      )
                    )
                  )}
                </h4>
              </div>
            </div>
          )
        })}
      </div>
      <Link
        to="/cart"
        className="go-to-cart button link"
        onClick={() => onClickCloseDropdown()}
      >
        GO TO CART
      </Link>
    </div>
  )
}
