import React, { createContext, useState } from "react"
import { User } from "../types"

type IUserContext = {
  user: User | undefined
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>
  authenticated: boolean
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  searchQuery: string
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>
}

type UserContextProviderProps = React.PropsWithChildren<{}>

export const UserContext = createContext<IUserContext | undefined>(undefined)

export default function UserContextProvider({
  children
}: UserContextProviderProps) {
  const [user, setUser] = useState<User | undefined>(undefined)
  const [authenticated, setAuthenticated] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        authenticated,
        setAuthenticated,
        searchQuery,
        setSearchQuery
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

UserContextProvider.displayName = "UserContextProvider"
