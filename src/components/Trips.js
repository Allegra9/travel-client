import React, { Component } from 'react'
import { getAllTrips } from '../adapter/api'
//import { getTrip } from '../adapter/api'
import NewTripForm from './NewTripForm'
import ShowTrip from './ShowTrip'

import '../css/Timeline.css';

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
'August', 'September', 'October', 'November', 'December'];

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
      return (a.date_from < b.date_from) ? 1 : ((b.date_from < a.date_from) ? -1 : 0)
    })

    const trips = sortedTrips.map(trip => {
      //console.log(trip.date_from.slice(0,10))   to get the full date
      return (
        <div class='timeline-item' key={trip.id}>
          <div class="timeline-img"></div>
          <div class='timeline-content'>
            <h3>{trip.name}</h3>

            {
              trip.date_from.slice(0,4) === trip.date_to.slice(0,4) ?

                months[trip.date_from.slice(5,7)-1] === months[trip.date_to.slice(5,7)-1] ?

                  <div class='date'>
                    {months[trip.date_from.slice(5,7)-1]} {trip.date_from.slice(0,4)}
                  </div>
                :
                  <div class='date'>
                    {months[trip.date_from.slice(5,7)-1]} - {months[trip.date_to.slice(5,7)-1]} {trip.date_from.slice(0,4)}
                  </div>

              :
                <div class='date'>
                  {months[trip.date_from.slice(5,7)-1]} {trip.date_from.slice(0,4)}
                  { } - { }
                  {months[trip.date_to.slice(5,7)-1]} {trip.date_to.slice(0,4)}
                </div>
            }

            <p>{trip.location}, {trip.country.toUpperCase()}</p>
            <a class='btn-info' onClick={() => this.showTrip(trip)}>show</a>
          </div>
        </div>
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
              <section class='timeline'>
                <div class='container'>
                  {trips}
                </div>
              </section>
            </div>
        }
      </div>
    )
  }

}

export default Trip
