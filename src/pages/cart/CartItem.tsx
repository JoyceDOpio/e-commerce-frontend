import { Link } from "react-router-dom"
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
import { CartProduct } from "../../types"

type CartItemProps = {
  data: CartProduct
  onSubtract: (productId: number) => void
  onAdd: (productId: number) => void
  onRemove: (productId: number) => void
}

export default function CartItem(props: CartItemProps) {
  const { id, image, price, quantity, title } = props.data
  const { onSubtract, onAdd, onRemove } = props

  return (
    <div className="CartItem">
      <Link to={`../products/${id}`} className="image-container link">
        <img src={image} alt={title} />
      </Link>
      <Link to={`../products/${id}`} className="title-container link">
        {title}
      </Link>
      <div className="counter">
        <div className="subtract-button" onClick={() => onSubtract(id)}>
          -
        </div>
        <div className="count">{quantity}</div>
        <div className="add-button" onClick={() => onAdd(id)}>
          +
        </div>
      </div>
      <div className="price-container">
        <h3>
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "PLN"
          }).format(price)}
        </h3>
      </div>
      <div className="delete-button" onClick={() => onRemove(id)}>
        <DeleteOutlineIcon className="icon" />
      </div>
    </div>
  )
}
