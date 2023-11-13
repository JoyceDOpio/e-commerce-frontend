import "./ProductList.scss"
import SearchProduct from "../SearchProduct/SearchProduct"
import { Product } from "../../../types"

export default function ProductList(props: { products: Product[] }) {
  const { products } = props

  return (
    <div className="ProductList">
      {products.map((product) => (
        <SearchProduct key={product.id} data={product} />
      ))}
    </div>
  )
}
