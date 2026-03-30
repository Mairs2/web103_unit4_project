// Checks that the user has selected a value for every required feature.
// Returns an error message string, or null if valid.
export const validateSelections = (selections) => {
  const required = ['name', 'frame', 'handlebar', 'wheels', 'saddle']

  for (const field of required) {
    if (!selections[field] || selections[field].trim() === '') {
      return `Please select a ${field} before submitting.`
    }
  }

  return null
}

// Checks for incompatible feature combinations.
// Add rules here as needed. Returns an error message string, or null if valid.
export const validateCompatibility = (selections) => {
  const { handlebar, wheels } = selections

  // Example rule: aero bars are not compatible with wide mountain wheels
  if (
    handlebar === 'Carbon Aerobar' &&
    wheels === 'Giant TRX 0 Carbon 29er'
  ) {
    return 'Carbon Aerobars are not compatible with 29er mountain wheels.'
  }

  return null
}

// Runs all validation checks and returns the first error found, or null.
export const validateBike = (selections) => {
  return validateSelections(selections) || validateCompatibility(selections)
}
