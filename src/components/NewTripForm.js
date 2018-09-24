import React, { Component } from 'react';
import { postTrip } from '../adapter/api';

class NewTripForm extends Component{

  state={
    user_id: 1,
    name: '',
    location: '',
    country: '',
    things_did: '',
    date_from: '',
    date_to: '',
    notes: '',
  }

  handleSubmit = (e) => {
    e.preventDefault()
    console.log(this.state)
    postTrip(this.state)
    this.setState({
        name: '',
        location: '',
        country: '',
        things_did: '',
        date_from: '',
        date_to: '',
        notes: '',
    }, () => this.props.addTrip() )
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
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
        <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default NewTripForm
