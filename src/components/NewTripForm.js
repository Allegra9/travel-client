import React, { Component } from 'react';
import { postTrip } from '../adapter/api';

class NewTripForm extends Component{

  state={
    user_id: 1,
    name: '',
    location: '',
    country: '',
    thingsDid: '',
    dateFrom: '',
    dateTo: '',
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
        thingsDid: '',
        dateFrom: '',
        dateTo: '',
        notes: '',
    })
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
          />
        <input type="text" value={this.state.location} name="location"
            onChange={this.handleChange}
            placeholder="Location"
          />
        <input type="text" value={this.state.country} name="country"
            onChange={this.handleChange}
            placeholder="Country"
          />
        <input type="text" value={this.state.thingsDid} name="thingsDid"
            onChange={this.handleChange}
            placeholder="Things did"
          />
        <input type="text" value={this.state.notes} name="notes"
            onChange={this.handleChange}
            placeholder="Notes"
          />
        <input type="text" value={this.state.dateFrom} name="dateFrom"
            onChange={this.handleChange}
            placeholder="date from"
          />
        <input type="text" value={this.state.dateTo} name="dateTo"
            onChange={this.handleChange}
            placeholder="date to"
          />
        <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default NewTripForm
