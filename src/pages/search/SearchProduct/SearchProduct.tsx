import "./SearchProduct.scss"
import StarRating from "../../../components/StarRating/StarRating"
import { Link } from "react-router-dom"
import { formatRating } from "../../../utils"
import { Product } from "../../../types"

export default function SearchProduct(props: { data: Product }) {
  const { id, title, price, image, rating } = props.data

  return (
    <Link className="Product link" to={`../products/${id}`}>
      <div className="image-container">
        <img src={image} alt={title} />
      </div>
      <div className="product-info-container details">
        <div className="title-container">{title}</div>
        <div className="rating-container">
          <span className="rating-value">
            {formatRating(String(rating.rate))}
          </span>
          <StarRating rating={rating.rate} />
        </div>
      </div>
      <div className="product-info-container price">
        <div className="border-padding">
          <div className="price-container">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "PLN"
            }).format(price)}
          </div>
          <div className="condition-container">
            <span>Condition:</span> {"new"}
          </div>
        </div>
      </div>
    </Link>
  )
}
