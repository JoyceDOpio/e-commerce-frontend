import React, { useState, useRef, useEffect } from "react"
import CarouselItem from "./CarouselItem"
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"
import { Product } from "../../types"

type CarouselProps = {
  items: Product[]
  title: string
}

type CarouselDimensions = {
  maxScrollWidth: number
  offsetWidth: number
  scrollWidth: number
}

export default function Carousel(props: CarouselProps) {
  const { items, title } = props
  const [currentIndex, setCurrentIndex] = useState(0)
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

  const onNext = () => {
    if (widths.offsetWidth * currentIndex < widths.maxScrollWidth) {
      setCurrentIndex((prevState) => prevState + 1)
    }
  }

  const onPrev = () => {
    if (currentIndex > 0) setCurrentIndex((prevState) => prevState - 1)
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
      <div className="carousel-title">
        <h3>{title}</h3>
      </div>

      <div className="button-container">
        <button
          className={isDisabled("prev") ? "disabled" : ""}
          onClick={onPrev}
        >
          <ArrowBackIosIcon />
        </button>
        <button
          className={isDisabled("next") ? "disabled" : ""}
          onClick={onNext}
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
          return (
            <CarouselItem
              key={index}
              imageUrl={item.image}
              title={item.title}
              price={item.price}
              onImageLoad={() => {
                if (index + 1 === items.length) {
                  setLoadingImages(false)
                }
              }}
              id={item.id}
            />
          )
        })}
      </div>
    </div>
  )
}
