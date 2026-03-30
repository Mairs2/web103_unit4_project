const BASE_URL = '/api/bikes'

export const getAllBikes = async () => {
  const response = await fetch(BASE_URL)
  return response.json()
}

export const getBike = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}`)
  return response.json()
}

export const createBike = async (bikeData) => {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bikeData),
  })
  return response.json()
}

export const updateBike = async (id, bikeData) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bikeData),
  })
  return response.json()
}

export const deleteBike = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  })
  return response.json()
}
