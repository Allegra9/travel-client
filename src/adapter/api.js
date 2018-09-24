const API_ROOT = `http://${window.location.hostname}:3000`;   //can connect on IP address
const HEADERS = {
  'Content-Type': 'application/json',
   'Accept': 'application/json',
};

export const getAllTrips = () => {
  return fetch(`${API_ROOT}/trips`)
    .then(res => res.json())
}

export const postTrip = (tripObj) => {
  console.log(tripObj)
  return fetch(`${API_ROOT}/trips`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify(tripObj)
  })
}
