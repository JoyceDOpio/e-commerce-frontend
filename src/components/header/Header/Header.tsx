import "./Header.scss"
import React from "react"
import SearchBar from "../SearchBar/SearchBar"
import Logo from "../Logo"
import NavBar from "../Navigation/NavBar/NavBar"
import { CartProduct } from "../../../types"

type HeaderProps = {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  cartProducts: CartProduct[]
}

export default function Header(props: HeaderProps) {
  const { onSubmit, cartProducts } = props

  return (
    <div className="Header">
      <Logo />
      <SearchBar onSubmitInput={onSubmit} />
      <NavBar cartProducts={cartProducts} />
    </div>
  )
}
