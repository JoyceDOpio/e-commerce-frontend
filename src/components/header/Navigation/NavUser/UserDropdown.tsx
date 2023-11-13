import React from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import { useUserContext } from "../../../../hooks/useUserContext"
import welcome from "../../../../assets/images/welcome.png"

axios.defaults.withCredentials = true
const baseUrl = import.meta.env.VITE_BASE_URL
const port = import.meta.env.VITE_PORT

type UserDropdownProps = {
  handleClick: () => void
  closeDropdown: () => void
}

export default function UserDropdown(props: UserDropdownProps) {
  const { handleClick, closeDropdown } = props
  const { user, setUser, authenticated, setAuthenticated } = useUserContext()

  const onLogout = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault()

    axios
      .post(`${baseUrl}${port}/api/auth/logout`)
      .then((response) => {
        if (response.status === 200) {
          setUser(undefined)
          setAuthenticated(false)
        }
      })
      .catch(function (error) {
        console.error("Error logging out:", error)
      })
    closeDropdown()
  }

  if (user && authenticated) {
    return (
      <div className="sign-buttons">
        <div className="title">Hello, {user.firstName}</div>
        <div className="sign-out button" onClick={(event) => onLogout(event)}>
          SIGN OUT
        </div>
      </div>
    )
  }

  return (
    <div className="sign-buttons">
      <div className="image-container">
        <img src={welcome} alt="Hello and Welcome" />
      </div>
      <Link
        to="/login"
        className="sign-in button link"
        onClick={() => handleClick()}
      >
        SIGN IN
      </Link>
      <div className="sign-up">
        New to GenEra?{" "}
        <Link to="/register" className="link" onClick={() => handleClick()}>
          Sign up
        </Link>
      </div>
    </div>
  )
}
