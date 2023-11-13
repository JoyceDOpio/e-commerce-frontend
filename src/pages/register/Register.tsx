import "./Register.scss"
import React, { useState } from "react"
import { Link } from "react-router-dom"
import OpenInNewIcon from "@mui/icons-material/OpenInNew"
import SomethingWentWrong from "../../components/SomethinWentWrong/SomethingWentWrong"
import axios from "axios"

axios.defaults.withCredentials = true
const baseUrl = import.meta.env.VITE_BASE_URL
const port = import.meta.env.VITE_PORT

type UserCredentials = {
  firstName: string
  lastName: string
  email: string
  password: string
}

export default function Register() {
  const [showPassword, setShowPassword] = useState(false)
  const [consented, setConsented] = useState(false)
  const [userData, setUserData] = useState<UserCredentials>({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  })
  const [statusCode, setStatusCode] = useState(0)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setUserData((currentUserData) => ({
      ...currentUserData,
      [name]: value
    }))
  }

  const handleShowPassword = () => {
    setShowPassword((prevState) => !prevState)
  }

  const handleConsent = () => {
    setConsented((prevState) => !prevState)
  }

  const onSubmit = (
    event:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>,
    data: UserCredentials
  ) => {
    event.preventDefault()
    const { firstName, lastName, email, password } = data

    axios
      .post(`${baseUrl}${port}/api/auth/register`, {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
      })
      .then((response) => setStatusCode(response.status))
      .catch((error) => {
        console.error("Error registering user", error)
        setStatusCode(error.response.status)
      })
  }

  if (statusCode === 500) {
    return <SomethingWentWrong />
  }

  if (statusCode === 201) {
    return (
      <div className="Register">
        <div className="registration-success">
          <div className="title">
            You have been successfully registered. Please sign in to continue as
            a user.
          </div>
          <Link to="/login" className="sign-in button link">
            SIGN IN
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="Register">
      <div className="container">
        <div className="title">Sign up</div>
        <div>
          <form
            action="/register"
            method="post"
            onSubmit={(event) => onSubmit(event, userData)}
          >
            <WarningMessage statusCode={statusCode} />
            <input
              name="firstName"
              type="text"
              placeholder="First name"
              value={userData.firstName}
              onChange={handleInputChange}
            />
            <input
              name="lastName"
              type="text"
              placeholder="Last name"
              value={userData.lastName}
              onChange={handleInputChange}
            />
            <input
              name="email"
              type="text"
              placeholder="Email"
              value={userData.email}
              onChange={handleInputChange}
            />
            <div className="password-container">
              <div>
                <input
                  className="password-input"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={userData.password}
                  onChange={handleInputChange}
                ></input>
              </div>
              <div>
                <button
                  className="button"
                  type="button"
                  onClick={handleShowPassword}
                >
                  {showPassword ? "HIDE" : "SHOW"}
                </button>
              </div>
            </div>
            <label className="terms-clause">
              <input
                type="checkbox"
                checked={consented}
                onChange={handleConsent}
                required
              />
              <span>
                <span className="required">*</span>I agree to the{" "}
                <Link
                  to="/terms"
                  className="link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Terms and Conditions <OpenInNewIcon className="icon" />
                </Link>
              </span>
            </label>
            <button
              className="button"
              type="submit"
              onClick={(event) => onSubmit(event, userData)}
            >
              SIGN UP
            </button>
            <div className="legend">
              <span className="required">*</span>Required
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

function WarningMessage(props: { statusCode: number }) {
  const { statusCode } = props

  if (statusCode === 400) {
    return (
      <div className="wrong-credentials">`Email address is already used.`</div>
    )
  }
  if (statusCode === 401) {
    return <div className="wrong-credentials">`Please provide valid data.`</div>
  }

  return null
}
