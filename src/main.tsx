import React from "react"
import ReactDOM from "react-dom/client"
import "./index.scss"
import App from "./App"
import { BrowserRouter as Router } from "react-router-dom"
import UserContextProvider from "./context/UserContext"

const root = ReactDOM.createRoot(document.getElementById("root") as Element)

root.render(
  <React.StrictMode>
    <Router>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </Router>
  </React.StrictMode>
)
