const BASE_URL = '/api/bikes/options'

export const getBikeOptions = async () => {
  const response = await fetch(BASE_URL)
  return response.json()
}
