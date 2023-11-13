import React, { useState, useRef, useEffect } from "react"
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"
import { Product } from "../../types"

type CarouselItemProps = {
  imageUrl: string
  title: string
  onImageLoad: () => void
  onClick?: (index: number) => void
  index: number
}

type CarouselProps = {
  items: Product[]
  title: string
  renderCarouselItem: (carouselItemProps: CarouselItemProps) => JSX.Element
  onCarouselItemClick?: (index: number) => void
  currentIndex: number
  onPrev: () => void
  onNext: (offsetWidth: number, widths: number) => void
}

type CarouselDimensions = {
  maxScrollWidth: number
  offsetWidth: number
  scrollWidth: number
}

export default function Carousel(props: CarouselProps) {
  const {
    items,
    title,
    renderCarouselItem,
    onCarouselItemClick,
    currentIndex,
    onPrev,
    onNext
  } = props
  const carouselRef: React.MutableRefObject<HTMLDivElement | null> =
    useRef(null)
  const [widths, setWidths] = useState<CarouselDimensions>({
    maxScrollWidth: 0,
    offsetWidth: 0,
    scrollWidth: 0
  })
  const [loadingImages, setLoadingImages] = useState(true)

  const isDisabled = (direction: "next" | "prev") => {
    switch (direction) {
      case "next":
        return widths.offsetWidth * currentIndex >= widths.maxScrollWidth
      case "prev":
        return currentIndex <= 0
      default:
        return false
    }
  }

  useEffect(() => {
    if (loadingImages === false) {
      if (carouselRef.current !== null) {
        setWidths({
          maxScrollWidth:
            carouselRef.current.scrollWidth - carouselRef.current.offsetWidth,
          offsetWidth: carouselRef.current.offsetWidth,
          scrollWidth: carouselRef.current.scrollWidth
        })
      }
    }
  }, [loadingImages])

  useEffect(() => {
    if (carouselRef !== null && carouselRef.current !== null) {
      carouselRef.current.scrollLeft = widths.offsetWidth * currentIndex
    }
  }, [currentIndex])

  return (
    <div className="Carousel">
      {title !== "" ? <div className="title">{title}</div> : <></>}

      <div className="button-container">
        <button
          className={isDisabled("prev") ? "disabled" : ""}
          onClick={() => onPrev()}
        >
          <ArrowBackIosIcon />
        </button>
        <button
          className={isDisabled("next") ? "disabled" : ""}
          onClick={() => onNext(widths.offsetWidth, widths.maxScrollWidth)}
        >
          <ArrowForwardIosIcon />
        </button>
      </div>

      <div
        ref={(element) => {
          if (element !== null) {
            carouselRef.current = element
          }
        }}
        className="carousel-container"
        id="carousel"
      >
        {items.map((item, index) => {
          return renderCarouselItem({
            // key: index,
            imageUrl: item.image,
            title: item.title,
            onImageLoad: () => {
              if (index + 1 === items.length) {
                setLoadingImages(false)
              }
            },
            onClick: onCarouselItemClick,
            index: index
          })
        })}
      </div>
    </div>
  )
}
