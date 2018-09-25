const API_ROOT = `http://${window.location.hostname}:3000`;   //can connect on IP address
const HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Access-Control-Allow-Origin': '*',
};

export const getAllTrips = () => {
  return fetch(`${API_ROOT}/trips`)
    .then(res => res.json())
}

export const createTrip = (trip) => {
  console.log(trip)
  return fetch(`${API_ROOT}/trips`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify(trip)
  })
}

export const editTrip = (trip) => {
  console.log(trip)
  return fetch(`${API_ROOT}/trips/${trip.id}`, {
    method: 'PATCH',
    headers: HEADERS,
    body: JSON.stringify(trip)
  })
}
