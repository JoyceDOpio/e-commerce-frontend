import "./SearchPage.scss"
import { useMemo } from "react"
import Pagination from "../Pagination/Pagination"
import ProductList from "../ProductList/ProductList"
import { Product } from "../../../types"

const PAGESIZE = 5

type SearchDisplayProps = {
  currentPage: number
  results: Product[]
  onProductPageChange: (page: number) => void
}

export default function SearchDisplay(props: SearchDisplayProps) {
  const { currentPage, results, onProductPageChange } = props
  const resultsToDisplay = useMemo(() => {
    const start = (currentPage - 1) * PAGESIZE
    const end = start + PAGESIZE
    return results.slice(start, end)
  }, [currentPage, results])

  if (resultsToDisplay.length > 0) {
    return (
      <div className="Search">
        <div className="results-container">
          <ProductList products={resultsToDisplay} />
          <Pagination
            totalResultCount={results.length}
            pageSize={PAGESIZE}
            currentPage={currentPage}
            onPageChange={onProductPageChange}
            siblingPageButtonCount={1}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="Search">
      <div className="no-results-found">
        {`We could not find what you're looking for`}
      </div>
    </div>
  )
}
