import "./SearchBar.scss"
import React from "react"
import SearchIcon from "@mui/icons-material/Search"
import { useUserContext } from "../../../hooks/useUserContext"

export default function SearchBar(props: {
  onSubmitInput: (event: React.FormEvent<HTMLFormElement>) => void
}) {
  const { onSubmitInput } = props
  const { searchQuery, setSearchQuery } = useUserContext()

  return (
    <div className="SearchBar">
      <form
        action="/search"
        method="get"
        onSubmit={(event) => onSubmitInput(event)}
      >
        <input
          name="query"
          type="search"
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="Search..."
          value={searchQuery}
        />
        <button type="submit">
          <span>
            <SearchIcon />
          </span>
        </button>
      </form>
    </div>
  )
}
