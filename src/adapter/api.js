const API_ROOT = `http://localhost:3000`;   //can connect on IP address
// const HEADERS = {
//   'Content-Type': 'application/json',
//   'Accept': 'application/json',
//   'Access-Control-Allow-Origin': '*',
// };

export const getAllTrips = () => {
  return fetch(`${API_ROOT}/trips`)
    .then(res => res.json())
}

export const getTrip = (trip_id) => {
  console.log("GETTING ONE:", trip_id)
  return fetch(`${API_ROOT}/trips/${trip_id}`)
    .then(res => res.json())
}

export const createTrip = (trip) => {
  console.log(trip)
  return fetch(`${API_ROOT}/trips`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(trip)
  })
}

export const editTrip = (trip) => {
  console.log(trip)
  return fetch(`${API_ROOT}/trips/${trip.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      //'Access-Control-Allow-Origin': '*',
      //'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS'
    },
    body: JSON.stringify(trip)
  }).then( resp => resp.json() )
}
