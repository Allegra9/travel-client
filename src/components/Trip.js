import React, { Component } from 'react';
import { getAllTrips } from '../adapter/api';
import NewTripForm from './NewTripForm'

class Trip extends Component {

  state={
    trips: [],
    tripsCount: '',
  }

  componentDidMount() {
    getAllTrips()
      .then(trips => {
        this.setState({ trips })
      })
  }

  //re-renders Trips anytime a new trip is added:
  addTrip = () => {
    console.log("ADD TRIP in Trip was hit")
    this.setState({
      tripsCount: this.state.tripsCount + 1
    }, () => getAllTrips()
    .then(trips => {
      this.setState({ trips })
    })
   )
  }

  render() {

  const trips = this.state.trips.map(trip => {
    return (
      <li key={trip.id}>
        NAME: {trip.name} <br/>
        LOCATION: {trip.location} <br/>
        COUNTRY: {trip.country} <br/>
        THINGS DID: {trip.things_did} <br/>
        NOTES: {trip.notes} <br/>
        DATE FROM: {trip.date_from} <br/>
        DATE TO: {trip.date_to} <br/>
        USER ID: {trip.user_id} <br/>
        TRIP ID: {trip.id}
      </li>
    )
  })

    return (
      <div>
        Hello! My trips:
        <ul>
          {trips}
        </ul>
        <NewTripForm addTrip={this.addTrip}/>
      </div>
    )
  }

}

export default Trip
