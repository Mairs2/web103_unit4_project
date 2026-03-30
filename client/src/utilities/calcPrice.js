// Given an options object (from bikeOptions) and the user's current selections,
// find the price of a single selected feature.
export const getOptionPrice = (optionsList, selectedName) => {
  const match = optionsList.find((opt) => opt.name === selectedName)
  return match ? match.price : 0
}

// Given all four selected feature names and the full bikeOptions object,
// return the total price as the sum of each chosen option's price.
export const calcTotalPrice = (selections, bikeOptions) => {
  const { frame, handlebar, wheels, saddle } = selections

  const total =
    getOptionPrice(bikeOptions.frame, frame) +
    getOptionPrice(bikeOptions.handlebar, handlebar) +
    getOptionPrice(bikeOptions.wheels, wheels) +
    getOptionPrice(bikeOptions.saddle, saddle)

  return total
}
