import "./ProductPage.scss"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import StarRating from "../../../components/StarRating/StarRating"
import CarouselOrchestrator from "../CarouselOrchestrator"
import axios from "axios"
import { formatRating } from "../../../utils"
import { Product } from "../../../types"

const baseUrl = import.meta.env.VITE_BASE_URL
const port = import.meta.env.VITE_PORT

export default function ProductPage(props: {
  onAddToCartButtonClick: (productId: number) => void
}) {
  const { onAddToCartButtonClick } = props
  const { id } = useParams()
  const [product, setProduct] = useState<Product>({
    id: 0,
    title: "",
    price: 0,
    description: "",
    category: "",
    image: "",
    rating: {
      rate: 0,
      count: 0
    }
  })

  useEffect(() => {
    axios
      .get(`${baseUrl}${port}/api/products/${id}`)
      .then((response) => response.data)
      .then((data) => setProduct(data))
      .catch(console.error)
  }, [])

  return (
    <div className="ProductPage">
      <div className="image-carousel container">
        <h2>{product.title}</h2>
        <div className="rating-container">
          <span className="rating-value">
            {formatRating(String(product.rating.rate))}
          </span>
          <StarRating rating={product.rating.rate} />
        </div>
        <CarouselOrchestrator image={product.image} />
      </div>

      <div className="side">
        <div className="add-to-cart container">
          <h3>{product.title}</h3>
          <h2>
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "PLN"
            }).format(product.price)}
          </h2>
          <div
            className="add button"
            onClick={() => onAddToCartButtonClick(Number(id))}
          >
            ADD TO CART
          </div>
        </div>

        <div className="description container">
          <h2>Description</h2>
          {product.description}
        </div>
      </div>
    </div>
  )
}
