import axios from 'axios'

const ApiURL = import.meta.env.VITE_APIURL
export const makeUnauthenticatedPOSTrequest = async (route, data) => {
  try {
    const response = await axios
      .post(`${ApiURL}${route}`, data)
      .catch((error) => {
        throw error
      })
    return response
  } catch (error) {
    throw error // rethrowing error for caller to handle it
  }
}

export const makeAuthenticatedPOSTrequest = async (route, data) => {
  const response = await fetch(`${ApiURL}${route}`, {
    method: 'POST',
    headers: {
      'content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  const formattedResponse = await response.json()
  return formattedResponse
}
