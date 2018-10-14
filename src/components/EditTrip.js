import React, { Component } from 'react';
import { editTrip } from '../adapter/api';

class EditTrip extends Component{

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
    editTrip(this.state)  // PUT
    //.then(res => console.log(res.error))
    // if (errors){
    //   console.log("ERR: ", errors)
    // }
    .then(res => {
      if (res.error){
        console.log("DIDN'T happen")
        //alert("Name, location and country can't be blank")
        let p = document.querySelector('p')
        p.innerText = "Name, location, country and dates can't be blank"
        p.style.color = 'red'
        let form = document.querySelector('form')
        form.prepend(p)
        return "Errors"
      } else {
        this.props.showTrip(this.state)
        this.props.cancelEdit()
      }
    })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  componentDidMount() {
    this.getTrip(this.props.trip)
  }

  getTrip = (trip) => {
    this.setState({
      user_id: trip.user_id,
      name: trip.name,
      location: trip.location,
      country: trip.country,
      things_did: trip.things_did,
      date_from: trip.date_from,
      date_to: trip.date_to,
      notes: trip.notes,
      id: trip.id
    })
  }

  render() {

    //const { trip } = this.props;

    return (
      <div>
        <p></p>
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
        <h4 onClick={this.props.cancelEdit}>cancel</h4>
      </div>
    )
  }
}

export default EditTrip
