import React, { Component } from 'react'
import EditTrip from './EditTripForm'
import { deleteTrip } from '../adapter/api'
import '../css/Show.css'

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
        <button className='btn btn-info' onClick={this.props.cancelShow}>BACK TO ALL TRIPS</button>

        <div key={trip.id} className="show-field">
          <h3>{trip.name}</h3>
          <h4>{trip.location}, {trip.country.toUpperCase()} </h4>
          {
            trip.things_did ?
              <p>Things did: {trip.things_did}</p>
            : null
          }
          {
            trip.notes ?
              <p>Notes: {trip.notes}</p>
            : null
          }
          <p><b>Travelled: </b>{trip.date_from.slice(0,10)} - {trip.date_to.slice(0,10)} </p>

          USER ID: {trip.user_id} <br/>
          TRIP ID: {trip.id} <br/>
        </div>

        {
          this.state.tripToEdit ?
            <EditTrip
              trip={this.state.tripToEdit}
              cancelEdit={this.cancelEdit}
              showTrip={this.props.showTrip}
            />
          :
            <div className="two-btns">
              <button className='btn btn-light' onClick={ () => this.chosenToEdit(trip) }>EDIT</button>
              <button className='btn btn-danger' id='delete' onClick={ () => this.delete(trip) }>DELETE</button>
            </div>
        }
      </div>
    )
  }

}

export default ShowTrip
