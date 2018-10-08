import React, { Component } from 'react'
import { getAllTrips } from '../adapter/api'
//import { getTrip } from '../adapter/api'
import NewTripForm from './NewTripForm'
import ShowTrip from './ShowTrip'

class Trip extends Component {

  state={
    trips: [],
    tripsCount: '',
    newForm: '',
    tripToShow: ''
  }

  componentDidMount() {
    getAllTrips()
      .then(trips => {
        this.setState({ trips })
      })
  }

  //re-renders Trips anytime a new trip is added:
  addTrip = () => {
    console.log("ADD TRIP in Trips was hit")
    this.setState({
      tripsCount: this.state.tripsCount + 1,
      newForm: '',
    }, () => getAllTrips()
    .then(trips => {
      this.setState({ trips })
    })
   )
  }

  newForm = () => {
    this.setState({
      newForm: this.state.newForm + 1
    })
  }

  cancelNewForm = () => {
    this.setState({
      newForm: '',
    })
  }

  showTrip = (trip) => {
    console.log("SHOW: ", trip)
    this.setState({
      tripToShow: trip,
    })
  }

  cancelShow = () => {
    this.setState({
      tripToShow: '',
    }, () => getAllTrips()
    .then(trips => {
      this.setState({ trips })
    })
   )
  }

  render() {

    const sortedTrips = this.state.trips.sort((a, b) => {
      return (a.id < b.id) ? 1 : ((b.id < a.id) ? -1 : 0)
    })

    const trips = sortedTrips.map(trip => {
      //console.log(trip.date_from.slice(0,10))
      return (
        <li key={trip.id} onClick={ () => this.showTrip(trip) }>
          NAME: {trip.name} <br/>
          LOCATION: {trip.location} <br/>
          COUNTRY: {trip.country} <br/>
          THINGS DID: {trip.things_did} <br/>
          NOTES: {trip.notes} <br/>
          DATE FROM: {trip.date_from.slice(0,10)} <br/>
          DATE TO: {trip.date_to.slice(0,10)} <br/>
          USER ID: {trip.user_id} <br/>
          TRIP ID: {trip.id} <br/>
          <br/>**********<br/>
        </li>
      )
    })

    return (
      <div>
        {
          this.state.newForm ?
            <NewTripForm
              addTrip={this.addTrip}
              cancelNewForm={this.cancelNewForm}
            />
          : null
        }
        {
          this.state.newForm || this.state.tripToShow ?
            null
          : <button onClick={this.newForm}>Add New TRIP</button>
        }
        {
          this.state.tripToShow ?
            <ShowTrip
              trip={this.state.tripToShow}
              cancelShow={this.cancelShow}
              showTrip={this.showTrip}
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
