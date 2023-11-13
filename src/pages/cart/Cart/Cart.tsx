import "./Cart.scss"
import CartItem from "../CartItem"
import { CartProduct } from "../../../types"

type CartProps = {
  products: CartProduct[]
  onCartItemSubtract: (productId: number) => void
  onCartItemAdd: (productId: number) => void
  onCartItemRemove: (productId: number) => void
}

export default function Cart(props: CartProps) {
  const { products, onCartItemSubtract, onCartItemAdd, onCartItemRemove } =
    props

  if (products.length === 0) {
    return (
      <div className="Cart">
        <div className="empty">
          <h2>Your cart is empty</h2>
        </div>
      </div>
    )
  }

  return (
    <div className="Cart">
      <div className="not-empty">
        <div className="main container">
          {products.map((product) => {
            return (
              <CartItem
                key={product.id}
                data={product}
                onAdd={onCartItemAdd}
                onSubtract={onCartItemSubtract}
                onRemove={onCartItemRemove}
              />
            )
          })}
        </div>
        <div className="side container">
          <div className="price">
            Total items value:
            <span>
              <h2>
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
              </h2>
            </span>
          </div>
          <div className="shipment button">SHIPMENT AND PAYMENT</div>
        </div>
      </div>
    </div>
  )
}
