import { useContext } from "react"
import { UserContext } from "../context/UserContext"

export const useUserContext = () => {
  const context = useContext(UserContext)

  if (context === undefined) {
    throw Error("Tried to use UserContext outside UserContextProvider")
  }

  return context
}
