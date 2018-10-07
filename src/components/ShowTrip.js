import React, { Component } from 'react'
import EditTrip from './EditTrip'
import { deleteTrip } from '../adapter/api';

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

  delete = async (trip) => {
    await deleteTrip(trip)
    this.props.cancelShow()
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
        </li>
        <br/>
        {
          this.state.tripToEdit ?
            <EditTrip
              trip={this.state.tripToEdit}
              cancelEdit={this.cancelEdit}
              showTrip={this.props.showTrip}
            />
          :
            <div>
              <h4 onClick={ () => this.chosenToEdit(trip) }>EDIT</h4>
              <h4 onClick={ () => this.delete(trip) }>DELETE</h4>
            </div>
        }
      </div>
    )
  }

}

export default ShowTrip
