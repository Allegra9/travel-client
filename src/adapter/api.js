const API_ROOT = `http://localhost:3000`;
const HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Access-Control-Allow-Origin': '*',
  //'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS'
};

// export const getAllTrips = () => {
//   return fetch(`${API_ROOT}/trips`)
//     .then(res => res.json())
// }

// export const getTrip = (trip_id) => {
//   console.log("GETTING ONE:", trip_id)
//   return fetch(`${API_ROOT}/trips/${trip_id}`)
//     .then(res => res.json())
// }

//TRIPS:
export const createTrip = (id, trip, token) => {
  console.log("api, createTrip: ", trip)
  return fetch(`${API_ROOT}/${id}/trips`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': getToken()
    },
    body: JSON.stringify(trip)
  }).then(resp => resp.json())
  //.then(res => console.log(res))
}

export const editTrip = (trip) => {
  console.log(trip)
  return fetch(`${API_ROOT}/trips/${trip.id}`, {
    method: 'PUT',
    headers: HEADERS,
    body: JSON.stringify(trip)
  }).then(resp => resp.json())
  //.then(res => console.log(res))
}

export const deleteTrip = (trip) => {
  console.log("deleting: ", trip)
  return fetch(`${API_ROOT}/trips/${trip.id}`, {
    method: 'DELETE',
  })
}

//USER:
export const createUser = (user) => {
  console.log("API:", user)
  return fetch(`${API_ROOT}/users`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify(user)
  })
  .then(res => res.json())
}

export const loginUser = (user) => {
  return fetch(`${API_ROOT}/login`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify(user)
  })
  .then(res => res.json())
}

const getToken = () => localStorage.getItem('token')

export const getCurrentUser = (token) => {
  return fetch(`${API_ROOT}/current_user`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': getToken()
    },
  }).then(res => res.json())
}

//GET USER'S TRIPS:
export const getTrips = (id, token) => {
  return fetch(`${API_ROOT}/${id}/trips`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': getToken()
    }
  }).then(res => res.json())
}
