import React, { Component } from 'react'
import { getAllTrips } from '../adapter/api'
import NewTripForm from './NewTripForm'
import EditTrip from './EditTrip'

class Trip extends Component {

  state={
    trips: [],
    tripsCount: '',
    //chosenToEdit: 0,
    tripToEdit: '',
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

//need to get trip's id here and pass it as props to EditTrip:
  chosenToEdit = (trip) => {
    console.log(trip)
    this.setState({
      //chosenToEdit: this.state.chosenToEdit + 1,
      tripToEdit: trip,
    })
  }

  // finishEdit = (e) => {
  //   this.setState({
  //     chosenToEdit: this.state.chosenToEdit - 1
  //   })
  // }

  render() {

    //conditional rendering which form to show Edit or New:

  const trips = this.state.trips.map(trip => {
    return (
      <li key={trip.id} onClick={() => this.chosenToEdit(trip)}>
        NAME: {trip.name} <br/>
        LOCATION: {trip.location} <br/>
        COUNTRY: {trip.country} <br/>
        THINGS DID: {trip.things_did} <br/>
        NOTES: {trip.notes} <br/>
        DATE FROM: {trip.date_from} <br/>
        DATE TO: {trip.date_to} <br/>
        USER ID: {trip.user_id} <br/>
        TRIP ID: {trip.id} <br/>
      <h4>EDIT</h4>
      </li>
    )
  })

    return (
      <div>
        Hello! My trips:
        <ul>
          {trips}
        </ul>
        {
          this.state.tripToEdit ?
            <EditTrip trip={this.state.tripToEdit} addTrip={this.addTrip} />
          : null
        }
        <NewTripForm addTrip={this.addTrip}/>
      </div>
    )
  }

}

export default Trip
