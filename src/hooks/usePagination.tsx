import { useMemo } from "react"

const calculatePageButtonRange = (startPage: number, endPage: number) => {
  const length = endPage - startPage + 1
  return Array.from({ length }, (_, index) => index + startPage)
}

type PaginationProps = {
  totalResultCount: number
  pageSize: number
  currentPage: number
  siblingPageButtonCount: number
}

export const DOTS = "..."

export const usePagination = (props: PaginationProps) => {
  const { totalResultCount, pageSize, currentPage, siblingPageButtonCount } =
    props
  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(totalResultCount / pageSize)

    const totalPageButtonsCount = 5 + 2 * siblingPageButtonCount

    if (totalPageCount <= totalPageButtonsCount) {
      return calculatePageButtonRange(1, totalPageCount)
    }

    const firstPageIndex = 1,
      lastPageIndex = totalPageCount

    const leftSiblingIndex = Math.max(currentPage - siblingPageButtonCount, 1)
    const rightSiblingIndex = Math.min(
      currentPage + siblingPageButtonCount,
      totalPageCount
    )

    const showLeftSibling = leftSiblingIndex > 2
    const showRightSibling = rightSiblingIndex < totalPageCount - 2

    if (!showLeftSibling && showRightSibling) {
      const leftSideButton = 3 + 2 * siblingPageButtonCount
      const leftRange = calculatePageButtonRange(1, leftSideButton)
      return [...leftRange, DOTS, lastPageIndex]
    } else if (showLeftSibling && !showRightSibling) {
      const rightSideButton = 3 + 2 * siblingPageButtonCount
      const rightRange = calculatePageButtonRange(
        totalPageCount - rightSideButton + 1,
        totalPageCount
      )
      return [firstPageIndex, DOTS, ...rightRange]
    } else {
      const middleRange = calculatePageButtonRange(
        leftSiblingIndex,
        rightSiblingIndex
      )
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex]
    }
  }, [totalResultCount, pageSize, currentPage, siblingPageButtonCount])

  return paginationRange
}
