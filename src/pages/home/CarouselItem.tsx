import { Link } from "react-router-dom"

type CarouselItemProps = {
  imageUrl: string
  onImageLoad: () => void
  price: number
  title: string
  id: number
}

export default function CarouselItem(props: CarouselItemProps) {
  const { imageUrl, onImageLoad, price, title, id } = props

  return (
    <Link className="CarouselItem link" to={`../products/${id}`}>
      <div className="image-container">
        <img src={imageUrl} alt={title} onLoad={onImageLoad} />
      </div>

      <div className="info-container">
        <div className="price">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "PLN"
          }).format(price)}
        </div>
        <div className="title">{title}</div>
      </div>
    </Link>
  )
}
