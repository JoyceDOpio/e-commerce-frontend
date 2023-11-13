import { useEffect, useRef } from "react"

export const useOutsideClick = (onHandleClick: any) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClick = ({ target }: MouseEvent) => {
      if (
        ref.current &&
        target instanceof HTMLElement &&
        !ref.current?.contains(target)
      ) {
        onHandleClick()
      }
    }

    document.addEventListener("click", handleClick, true)

    return () => {
      document.removeEventListener("click", handleClick, true)
    }
  }, [ref])

  return ref
}
