import React, { Component } from 'react';
import { createTrip } from '../adapter/api';
import Select from 'react-select';
import Calendar from 'react-calendar'

const worldCountries = require("world-countries")
//console.log(worldCountries[124].name.common) //make obj

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
    createTrip(this.state)
    .then(res => {
      if (!res.id){
        console.log("DIDN'T happen")
        //alert("Name, location and country can't be blank")
        let p = document.querySelector('p')
        p.innerText = "Name, location, country and dates can't be blank"
        p.style.color = 'red'
        let form = document.querySelector('form')
        form.prepend(p)
        return "Errors"
      }else {
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
    })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onFromDateChange = (date) => {     //object to string
    date = JSON.stringify(date).slice(1,11) // 2018-10-24
    this.setState({ date_from: date})
  }

  onToDateChange = (date) => {
    date = JSON.stringify(date).slice(1,11)
    this.setState({ date_to: date})
  }

  handleCountryOption = (selectedOption) => {    // added
    //console.log(Object.values(selectedOption)[0])
    this.setState({
      country: Object.values(selectedOption)[0]
    })
  }

  getCountriesObj = () => {
    let selectOptions = []
    worldCountries.forEach(country => {
      let obj = {}
      obj['value'] = country.name.common, obj['label'] = country.name.common
      selectOptions = [...selectOptions, obj]
    })
    return selectOptions
  }
  //[ { value: 'France', label: 'France' }, {...} ]

  render() {

    const {
      name,
      location,
      country,
      things_did,
      notes,
      date_from,
      date_to
    } = this.state;

    return (
      <div>
        NEW TRIP:
        <p></p>
        <form onSubmit={this.handleSubmit} >
          TRIP NAME:
          <input type="text" value={name} name="name"
            onChange={this.handleChange}
            placeholder="Trip name"
          /> <br/>

          LOCATION:
          <input type="text" value={location} name="location"
            onChange={this.handleChange}
            placeholder="Location"
          /> <br/>

          COUNTRY:
          <Select
            onChange={this.handleCountryOption}
            options={this.getCountriesObj()}
            placeholder='Select a country...'
            isSearchable={true}
          />

          THINGS DID:
          <input type="text" value={things_did} name="things_did"
            onChange={this.handleChange}
            placeholder="Things did"
          /> <br/>

          NOTES:
          <input type="text" value={notes} name="notes"
            onChange={this.handleChange}
            placeholder="Notes"
          /> <br/>

          DATE FROM:
          <Calendar
            onChange={this.onFromDateChange}
            value={this.state.date}
          />

          DATE TO:
          <Calendar
            onChange={this.onToDateChange}
            value={this.state.date}
          />

          <input type="submit" value="Submit" />
        </form>
        <h4 onClick={this.props.cancelNewForm}>cancel</h4>
      </div>
    )
  }
}

export default NewTripForm
