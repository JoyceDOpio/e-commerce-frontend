import React, { useState } from "react"
import Carousel from "./Carousel"
import CarouselItem from "./CarouselItem"

type CarouselItemProps = {
  imageUrl: string
  title: string
  onImageLoad: () => void
  onClick?: (index: number) => void
  index: number
}

export default function CarouselOrchestrator(props: { image: string }) {
  const { image } = props
  const images = [...new Array(10)].map((_, index) => {
    return {
      id: index,
      title: "title",
      price: index,
      description: "description",
      category: "category",
      image: image,
      rating: {
        rate: index,
        count: index
      }
    }
  })
  const [mainCarouselIndex, setMainCarouselIndex] = useState(0)
  const [miniCarouselIndex, setMiniCarouselIndex] = useState(0)

  const onNext = (
    offsetWidth: number,
    maxScrollWidth: number,
    carouselIndex: number,
    setCarouselIndex: React.Dispatch<React.SetStateAction<number>>
  ) => {
    if (offsetWidth * carouselIndex < maxScrollWidth) {
      setCarouselIndex((prevState: number) => prevState + 1)
    }
  }

  const onPrev = (
    carouselIndex: number,
    setCarouselIndex: React.Dispatch<React.SetStateAction<number>>
  ) => {
    if (carouselIndex > 0)
      setCarouselIndex((prevState: number) => prevState - 1)
  }

  return (
    <div className="CarouselOrchestrator">
      <div className="main-carousel">
        <Carousel
          items={images}
          title=""
          renderCarouselItem={(carouselItemProps: CarouselItemProps) => (
            <CarouselItem {...carouselItemProps} />
          )}
          currentIndex={mainCarouselIndex}
          onNext={(offsetWidth, maxScrollWidth) =>
            onNext(
              offsetWidth,
              maxScrollWidth,
              mainCarouselIndex,
              setMainCarouselIndex
            )
          }
          onPrev={() => onPrev(mainCarouselIndex, setMainCarouselIndex)}
        />
      </div>
      <div className="mini-carousel">
        <Carousel
          items={images}
          title=""
          renderCarouselItem={(carouselItemProps: CarouselItemProps) => (
            <CarouselItem {...carouselItemProps} />
          )}
          onCarouselItemClick={(index: number) => {
            setMainCarouselIndex(index)
          }}
          currentIndex={miniCarouselIndex}
          onNext={(offsetWidth, maxScrollWidth) =>
            onNext(
              offsetWidth,
              maxScrollWidth,
              miniCarouselIndex,
              setMiniCarouselIndex
            )
          }
          onPrev={() => onPrev(miniCarouselIndex, setMiniCarouselIndex)}
        />
      </div>
    </div>
  )
}
