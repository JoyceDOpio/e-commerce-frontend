import "./Footer.scss"
import { Link } from "react-router-dom"

type Subtitle = {
  page: string
  title: string
}

export default function Footer(props: { subtitles: Subtitle[] }) {
  const { subtitles } = props

  return (
    <div className="Footer">
      <div className="company-name">
        <h2>GenEra</h2>
      </div>
      <div className="subtitles">
        {subtitles.map((subtitle, index) => (
          <Link key={index} className="subtitle footer-link" to={subtitle.page}>
            {subtitle.title}
          </Link>
        ))}
      </div>
    </div>
  )
}
