import React, { Component } from 'react'
import EditTrip from './EditTrip'

class ShowTrip extends Component {

  state={
    tripToEdit: '',
    //currentTrip: '',
  }

  //need to get trip's id here and pass it as props to EditTrip:
  chosenToEdit = (trip) => {
    console.log(trip)
    this.setState({
      //chosenToEdit: this.state.chosenToEdit + 1,
      tripToEdit: trip,
    })
  }

// <ShowTrip trip={this.state.tripToShow} addTrip={this.addTrip} />

  render() {

    const { trip } = this.props;

    return (
      <div>
        <li key={trip.id}>
          <h4 onClick={this.props.resetShowTrip}>BACK TO ALL TRIPS</h4>
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
        <h4>DELETE</h4>
        </li>

        {
          this.state.tripToEdit ?
            <EditTrip trip={this.state.tripToEdit} addTrip={this.props.addTrip} />
          : null
        }
      </div>
    )
  }

}

export default ShowTrip
