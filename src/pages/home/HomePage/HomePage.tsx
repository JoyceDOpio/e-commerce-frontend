import "./HomePage.scss"
import Carousel from "../Carousel"
import { Product } from "../../../types"

export default function HomePage(props: { products: Product[] }) {
  const { products } = props

  return (
    <div className="HomePage">
      <Carousel items={products.slice(0, 20)} title={"Recommended"} />
      <Carousel items={products.slice(10, 20)} title={"Recently viewed"} />
    </div>
  )
}
