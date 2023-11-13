import "./StarRating.scss"
import StarIcon from "@mui/icons-material/Star"
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined"

type StarRatingProps = {
  rating: number
  starsTotal?: number
}

export default function StarRating(props: StarRatingProps) {
  const { rating, starsTotal = 5 } = props
  const fullStars = Math.floor(rating)
  const partialStar = Number((Math.round((rating % 1) * 10) / 10).toFixed(1))
  const stars = Array.from({ length: starsTotal }, (_, index) => {
    if (index < fullStars) return 1
    else if (index === fullStars && partialStar !== 0) {
      return partialStar
    }
    return 0
  })

  return (
    <div className="StarRating">
      {stars.map((element, index) => {
        return (
          <div className="star" key={index}>
            <StarIcon className={`filled col-${index + 1}`} />
            <div className={`empty col-${index + 1}`} data-fill={element}>
              {" "}
            </div>
            <StarBorderOutlinedIcon className={`outlined col-${index + 1}`} />
          </div>
        )
      })}
    </div>
  )
}
