import React, { Component } from 'react';
import { editTrip } from '../adapter/api';

class EditTrip extends Component{

//DO I NEED STATE HERE?
  state={
    user_id: '',
    name: '',
    location: '',
    country: '',
    things_did: '',
    date_from: '',
    date_to: '',
    notes: '',
    id: '',
  }

  handleSubmit = (e) => {
    e.preventDefault()
    console.log(this.state)
    editTrip(this.state)   //PATCH pls
    this.setState({
        name: '',
        location: '',
        country: '',
        things_did: '',
        date_from: '',
        date_to: '',
        notes: '',
    }, () => this.props.addTrip() )  // need this
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  componentDidUpdate(prevProps) {  // compares before updating
    if (prevProps.trip.id !== this.props.trip.id){
      console.log("Trip I'm editing: ", this.props.trip.id)
      this.getTrip(this.props.trip.id)
    }
  }

  getTrip = () => {
    this.setState({
      user_id: this.props.trip.user_id,
      name: this.props.trip.name,
      location: this.props.trip.location,
      country: this.props.trip.country,
      things_did: this.props.trip.things_did,
      date_from: this.props.trip.date_from,
      date_to: this.props.trip.date_to,
      notes: this.props.trip.notes,
      id: this.props.trip.id
    })
  }

  render() {

    //const { trip } = this.props;

    return (
      <div>
        <form onSubmit={this.handleSubmit} >
          <input type="text" value={this.state.name} name="name"
            onChange={this.handleChange}
            placeholder="Trip name"
          /> <br/>
        <input type="text" value={this.state.location} name="location"
            onChange={this.handleChange}
            placeholder="Location"
          /> <br/>
        <input type="text" value={this.state.country} name="country"
            onChange={this.handleChange}
            placeholder="Country"
          /> <br/>
        <input type="text" value={this.state.things_did} name="things_did"
            onChange={this.handleChange}
            placeholder="Things did"
          /> <br/>
        <input type="text" value={this.state.notes} name="notes"
            onChange={this.handleChange}
            placeholder="Notes"
          /> <br/>
        <input type="text" value={this.state.date_from} name="date_from"
            onChange={this.handleChange}
            placeholder="date from"
          /> <br/>
        <input type="text" value={this.state.date_to} name="date_to"
            onChange={this.handleChange}
            placeholder="date to"
          /> <br/>
        <input type="submit" value="Update" />
        </form>
      </div>
    )
  }
}

export default EditTrip
