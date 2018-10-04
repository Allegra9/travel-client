import React, { Component } from 'react'
import { getAllTrips } from '../adapter/api'
//import { getTrip } from '../adapter/api'
import NewTripForm from './NewTripForm'
import ShowTrip from './ShowTrip'

class Trip extends Component {

  state={
    trips: [],
    tripsCount: '',
    addNewTrip: '',

    tripToShow: ''
    //tripToEdit: '',
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
      tripsCount: this.state.tripsCount + 1,
      addNewTrip: '',
    }, () => getAllTrips()
    .then(trips => {
      this.setState({ trips })
    })
   )
  }

  resetNewTrip = () => {
    this.setState({
      addNewTrip: '',
    })
  }

  addNewTrip = () => {
    this.setState({
      addNewTrip: this.state.addNewTrip + 1
    })
  }

  showTrip = (trip) => {
    console.log("SHOW: ", trip)
    this.setState({
      tripToShow: trip,
    })
  }

  resetShowTrip = () => {
    this.setState({
      tripToShow: '',
    })
  }

//need to get trip's id here and pass it as props to EditTrip:
  // chosenToEdit = (trip) => {
  //   console.log(trip)
  //   this.setState({
  //     //chosenToEdit: this.state.chosenToEdit + 1,
  //     tripToEdit: trip,
  //   })
  // }

  // finishEdit = (e) => {
  //   this.setState({
  //     chosenToEdit: this.state.chosenToEdit - 1
  //   })
  // }

  render() {

  const trips = this.state.trips.map(trip => {
    return (
      <li key={trip.id} onClick={() => this.showTrip(trip)}>
        NAME: {trip.name} <br/>
        LOCATION: {trip.location} <br/>
        COUNTRY: {trip.country} <br/>
        THINGS DID: {trip.things_did} <br/>
        NOTES: {trip.notes} <br/>
        DATE FROM: {trip.date_from} <br/>
        DATE TO: {trip.date_to} <br/>
        USER ID: {trip.user_id} <br/>
        TRIP ID: {trip.id} <br/>
        <br/>**********<br/>
      </li>
    )
  })

    return (
      <div>
        {
          this.state.addNewTrip ?
          <NewTripForm
            addTrip={this.addTrip}
            resetNewTrip={this.resetNewTrip}
          />
        : null
        }
        {
          this.state.addNewTrip || this.state.tripToShow ?
          null
          : <button onClick={this.addNewTrip}>Add New TRIP</button>
        }
        {
          this.state.tripToShow ?
            <ShowTrip
              trip={this.state.tripToShow}
              addTrip={this.addTrip}
              resetShowTrip={this.resetShowTrip}
            />
          :
          <div>
            <h1>MY TRIPS:</h1>
            <ul>{trips}</ul>
          </div>
        }
      </div>
    )
  }

}

export default Trip
