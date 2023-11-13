type CarouselItemProps = {
  imageUrl: string
  title: string
  onImageLoad: () => void
  onClick?: (index: number) => void
  index: number
}

export default function CarouselItem(props: CarouselItemProps) {
  const { imageUrl, title, onImageLoad, onClick, index } = props

  if (onClick) {
    return (
      <div className="CarouselItem">
        <div className="image-container" onClick={() => onClick(index)}>
          <img src={imageUrl} alt={title} onLoad={onImageLoad} />
        </div>
      </div>
    )
  }

  return (
    <div className="CarouselItem">
      <div className="image-container">
        <img src={imageUrl} alt={title} onLoad={onImageLoad} />
      </div>
    </div>
  )
}
