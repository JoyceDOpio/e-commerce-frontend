import "./App.scss"
import React, { useEffect, useState } from "react"
import { Routes, Route, useNavigate, useLocation } from "react-router-dom"
import Header from "./components/header/Header/Header"
import Footer from "./components/footer/Footer/Footer"
import HomePage from "./pages/home/HomePage/HomePage"
import SearchPage from "./pages/search/SearchPage/SearchPage"
import Subtitle from "./components/footer/Subtitle/Subtitle"
import ProductPage from "./pages/products/ProductPage/ProductPage"
import Login from "./pages/login/Login"
import Register from "./pages/register/Register"
import Cart from "./pages/cart/Cart/Cart"
import ProtectedRoute from "./components/Protected"
import PageNotFound from "./components/PageNotFound/PageNotFound"
import axios from "axios"
import { useUserContext } from "./hooks/useUserContext"

const baseUrl = import.meta.env.VITE_BASE_URL
const port = import.meta.env.VITE_PORT

type Product = {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: {
    rate: number
    count: number
  }
}

type CartItem = {
  id: number
  quantity: number
}

type CartProduct = {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: {
    rate: number
    count: number
  }
  quantity: number
}

export default function App() {
  const { searchQuery, setSearchQuery } = useUserContext()
  const [products, setProducts] = useState<Product[]>([])
  const [currentSearchPage, setCurrentSearchPage] = useState(0)
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [cart, setCart] = useState<CartItem[]>([])
  const navigate = useNavigate()
  const location = useLocation()

  const subtitles = [
    { page: "about", title: "About Us" },
    { page: "terms", title: "Terms and Regulations" },
    { page: "payment_methods", title: "Payment Methods" },
    { page: "shipping", title: "Shipping Options" },
    { page: "returns", title: "Returns and replacements" }
  ]

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
  }, [location.pathname])

  useEffect(() => {
    axios
      .get(`${baseUrl}${port}/api/products`)
      .then((response) => response.data)
      .then((data) => {
        setProducts(data)
        setCurrentSearchPage(1)
      })
      .catch(console.error)
  }, [])

  useEffect(() => {
    const pathname = location.pathname
    if (pathname !== "/search") setSearchQuery("")
  }, [location])

  const cartProducts = (): CartProduct[] => {
    return products
      .filter((product) => {
        return cart.some((item) => {
          return product.id === item.id
        })
      })
      .map((filteredProduct) => {
        let quantity = 1
        cart.forEach((item) => {
          if (filteredProduct.id === item.id) {
            quantity = item.quantity
          }
        })
        return {
          ...filteredProduct,
          quantity: quantity
        }
      })
  }

  const onAddToCart = (productId: number) => {
    const updatedCart = cart.map((item) => {
      if (item.id === productId) {
        return {
          ...item,
          quantity: item.quantity + 1
        }
      }
      return item
    })

    if (cart.some((item) => item.id === productId)) {
      setCart(updatedCart)
    } else {
      setCart([...updatedCart, { id: productId, quantity: 1 }])
    }
  }

  const onDecreaseItemQuantityInCart = (productId: number) => {
    const updatedCart = cart.map((item) => {
      if (item.id === productId && item.quantity > 1) {
        return {
          ...item,
          quantity: item.quantity - 1
        }
      }
      return item
    })

    setCart(updatedCart)
  }

  const onPageChange = (page: number) => {
    setCurrentSearchPage(page)
  }

  const onRemoveFromCart = (productId: number) => {
    const updatedCart = cart.filter((item) => item.id !== productId)
    setCart(updatedCart)
  }

  const onSubmitQuery = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    navigate("/search")

    if (searchQuery !== "") {
      const filteredProducts = products.filter((product) => {
        return product.title.toLowerCase().includes(searchQuery.toLowerCase())
      })

      setFilteredProducts(filteredProducts)
    }
  }

  return (
    <div className="App">
      <Header onSubmit={onSubmitQuery} cartProducts={cartProducts()} />
      <Routes>
        <Route path="/" element={<HomePage products={products} />} />
        <Route
          path="search"
          element={
            <SearchPage
              currentPage={currentSearchPage}
              results={filteredProducts}
              onProductPageChange={onPageChange}
            />
          }
        />
        <Route
          path="products/:id"
          element={
            <ProductPage
              onAddToCartButtonClick={(productId: number) =>
                onAddToCart(productId)
              }
            />
          }
        />
        {subtitles.map((subtitle, index) => {
          return (
            <Route
              key={index}
              path={subtitle.page}
              element={<Subtitle title={subtitle.title} />}
            />
          )
        })}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route
          path="cart"
          element={
            <ProtectedRoute>
              <Cart
                products={cartProducts()}
                onCartItemAdd={(productId) => onAddToCart(productId)}
                onCartItemSubtract={(productId) =>
                  onDecreaseItemQuantityInCart(productId)
                }
                onCartItemRemove={(productId) => onRemoveFromCart(productId)}
              />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer subtitles={subtitles} />
    </div>
  )
}
