import "./Login.scss"
import React, { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import SomethingWentWrong from "../../components/SomethinWentWrong/SomethingWentWrong"
import axios from "axios"
import { useUserContext } from "../../hooks/useUserContext"

axios.defaults.withCredentials = true
const baseUrl = import.meta.env.VITE_BASE_URL
const port = import.meta.env.VITE_PORT

type UserCredentials = {
  email: string
  password: string
}

export default function Login() {
  const { setUser, setAuthenticated } = useUserContext()
  const [showPassword, setShowPassword] = useState(false)
  const [userData, setUserData] = useState<UserCredentials>({
    email: "",
    password: ""
  })
  const [statusCode, setStatusCode] = useState(0)
  const navigate = useNavigate()
  const location = useLocation()

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

  const onSubmit = (
    event:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>,
    data: { email: string; password: string }
  ) => {
    event.preventDefault()
    const { email, password } = data

    axios
      .post(`${baseUrl}${port}/api/auth/login`, {
        email: email,
        password: password
      })
      .then((response) => {
        if (response.status === 200) {
          setUser({
            id: response.data.userId,
            email: response.data.email,
            firstName: response.data.firstName,
            lastName: response.data.lastName
          })
          setAuthenticated(true)

          if (location.state?.from) {
            navigate(location.state.from)
          } else {
            navigate("/")
          }
        }
        setStatusCode(response.status)
      })
      .catch((error) => {
        console.error("Error logging in:", error)
        setStatusCode(error.response.status)
      })
  }

  if (statusCode === 500) {
    return <SomethingWentWrong />
  }

  return (
    <div className="Login">
      <div className="sign-in">
        <div className="title">Sign in</div>
        <div>
          <form
            action="/login"
            method="post"
            onSubmit={(event) => {
              onSubmit(event, userData)
            }}
          >
            {statusCode === 401 ? (
              <div className="wrong-credentials">
                The email address and/or password you provided is incorrect.
              </div>
            ) : null}
            <input
              name="email"
              type="text"
              placeholder="Email"
              onChange={handleInputChange}
            />
            <div className="password-container">
              <div>
                <input
                  className="password-input"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
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
            <button
              className="button"
              type="submit"
              onClick={(event) => {
                onSubmit(event, userData)
              }}
            >
              SIGN IN
            </button>
          </form>
        </div>
      </div>

      <div className="sign-up">
        New to GenEra?{" "}
        <Link to="/register" className="link">
          SIGN UP
        </Link>
      </div>
    </div>
  )
}
