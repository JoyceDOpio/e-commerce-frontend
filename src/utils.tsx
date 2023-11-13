export const formatRating = (rate: string) => {
  if (!rate.includes(".")) {
    return rate.concat(".0")
  }
  return rate
}
