import React, { useState } from "react"
import PersonOutlineIcon from "@mui/icons-material/PersonOutline"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import { useOutsideClick } from "../../../../hooks/useOutsideClick"
import UserDropdown from "./UserDropdown"

export default function UserIcon() {
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false)
  const outsideClickRef: React.RefObject<HTMLDivElement> = useOutsideClick(() =>
    closeDropdown()
  )

  const handleClick = () => {
    setDropdownIsOpen((prevState) => !prevState)
  }

  const closeDropdown = () => {
    setDropdownIsOpen(false)
  }

  return (
    <div className="UserIcon">
      <PersonOutlineIcon className="icon" />
      <div>
        {dropdownIsOpen ? (
          <KeyboardArrowUpIcon
            className="arrow icon"
            onClick={() => handleClick()}
          />
        ) : (
          <KeyboardArrowDownIcon
            className="arrow icon"
            onClick={() => handleClick()}
          />
        )}
      </div>

      <div ref={outsideClickRef}>
        {dropdownIsOpen ? (
          <UserDropdown
            handleClick={handleClick}
            closeDropdown={closeDropdown}
          />
        ) : null}
      </div>
    </div>
  )
}
