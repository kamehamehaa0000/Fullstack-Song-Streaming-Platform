const ApiURL = import.meta.env.VITE_APIURL
export const makeUnauthenticatedPOSTrequest = async (route, data) => {
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
