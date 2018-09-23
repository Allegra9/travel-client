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

  // Parameters: {
  //   "user_id"=>1,
  //   "name"=>"Aya's bday weekend",
  //   "location"=>"Amalfi Coast",
  //   "country"=>"Italy",
  //   "thingsDid"=>"Pizza & fun",
  //   "dateFrom"=>"2018-11-27",
  //   "dateTo"=>"2018-12-01",
  //   "notes"=>"It was warm for November. Almost went swimming",
  //
  //   "trip"=>{
  //     "name"=>"Aya's bday weekend",
  //     "country"=>"Italy",
  //     "location"=>"Amalfi Coast",
  //     "notes"=>"It was warm for November. Almost went swimming",
  //     "user_id"=>1
  //   }
  // }
