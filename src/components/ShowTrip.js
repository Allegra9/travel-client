import React, { Component } from 'react'
import EditTrip from './EditTripForm'
import { deleteTrip } from '../adapter/api'
import '../css/Show.css'

class ShowTrip extends Component {

  state={
    tripToEdit: '',
  }

  chosenToEdit = (trip) => {
    console.log("TRIP TO EDIT: ", trip)
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

    const makeImgObj = () => {
      if (JSON.parse(trip.image_name) !== null){
        let images = []
        for(let i = 0; i < JSON.parse(trip.image_name).length; i++) {
          let img = {}
          img['data'] = JSON.parse(trip.image_data)[i]
          img['name'] = JSON.parse(trip.image_name)[i]
          img['type'] = JSON.parse(trip.image_type)[i]
          img['size'] = JSON.parse(trip.image_size)[i]
          images = [...images, img]
        }
        return images
      }else {
        return []
      }
    }

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

        <div className="imageTable">
          {
            makeImgObj().map(img =>
              <span key={Math.random()} className="imageCard">
                <img src={img.data} alt={img.name}></img>
                <p>{img.name}</p>
                <p>{img.type} - {img.size}</p>
              </span>
            )
          }
        </div>
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
