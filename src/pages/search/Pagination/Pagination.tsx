import "./Pagination.scss"
import { useEffect } from "react"
import { usePagination, DOTS } from "../../../hooks/usePagination"

type PaginationProps = {
  onPageChange: (page: number) => void
  totalResultCount: number
  pageSize: number
  currentPage: number
  siblingPageButtonCount: 1
}

export default function Pagination(props: PaginationProps) {
  const {
    onPageChange,
    totalResultCount,
    pageSize,
    currentPage,
    siblingPageButtonCount
  } = props
  const paginationRange = usePagination({
    totalResultCount,
    pageSize,
    currentPage,
    siblingPageButtonCount
  })

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
  }, [currentPage])

  if (currentPage === 0 || paginationRange.length < 2) return null

  const onNext = () => onPageChange(currentPage + 1)
  const onPrevious = () => onPageChange(currentPage - 1)

  const firstPage = 1
  const lastPage = paginationRange[paginationRange.length - 1]

  return (
    <div className="Pagination">
      <div className="pagination-container">
        <div
          className={`pagination-item arrow left${
            currentPage === firstPage ? " disabled" : ""
          }`}
        >
          <span
            className="border-padding"
            onClick={onPrevious}
            aria-disabled={currentPage === firstPage}
          >
            Previous
          </span>
        </div>

        {paginationRange.map((pageNumber, index) => {
          if (typeof pageNumber === "string") {
            if (pageNumber === DOTS) {
              return (
                <div key={index} className="pagination-item dots">
                  &#8230;
                </div>
              )
            }
            return null
          }

          return (
            <div
              key={index}
              className={`pagination-item ${
                currentPage === pageNumber ? " current-" : ""
              }page`}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </div>
          )
        })}
        <div
          className={`pagination-item arrow right${
            currentPage === lastPage ? " disabled" : ""
          }`}
        >
          <span className="border-padding" onClick={onNext}>
            Next
          </span>
        </div>
      </div>
    </div>
  )
}
