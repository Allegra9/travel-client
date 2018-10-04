import React, { Component } from 'react'
import EditTrip from './EditTrip'

class ShowTrip extends Component {

  state={
    tripToEdit: '',
  }

  chosenToEdit = (trip) => {
    console.log(trip)
    this.setState({
      tripToEdit: trip,
    })
  }
  cancelEdit = () => {
    this.setState({
      tripToEdit: '',
    })
  }

  render() {

    const { trip } = this.props;

    return (
      <div>
        <li key={trip.id}>
          <h4 onClick={this.props.cancelShow}>BACK TO ALL TRIPS</h4>
          NAME: {trip.name} <br/>
          LOCATION: {trip.location} <br/>
          COUNTRY: {trip.country} <br/>
          THINGS DID: {trip.things_did} <br/>
          NOTES: {trip.notes} <br/>
          DATE FROM: {trip.date_from} <br/>
          DATE TO: {trip.date_to} <br/>
          USER ID: {trip.user_id} <br/>
          TRIP ID: {trip.id} <br/>
        <h4 onClick={ () => this.chosenToEdit(trip) }>EDIT</h4>
        <h4>DELETE</h4>
        </li>

        {
          this.state.tripToEdit ?
            <EditTrip
              trip={this.state.tripToEdit}
              addTrip={this.props.addTrip}
              cancelEdit={this.cancelEdit}
              showTrip={this.props.showTrip}
            />
          : null
        }
      </div>
    )
  }

}

export default ShowTrip
