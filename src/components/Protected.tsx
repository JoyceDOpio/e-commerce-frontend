import { useLocation } from "react-router"
import { Navigate } from "react-router-dom"
import { useUserContext } from "../hooks/useUserContext"

type ProtectedRouteProps = React.PropsWithChildren<{}>

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, authenticated } = useUserContext()
  const location = useLocation()

  if (user && authenticated) {
    return children
  }

  return <Navigate to="/login" replace state={{ from: location }} />
}
