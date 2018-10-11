import React, { Component } from 'react'
import { createTrip } from '../adapter/api'
import Select from 'react-select'
import Calendar from 'react-calendar'
import '../css/Form.css'

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

    clicked: false,
  }

  handleSubmit = (e) => {
    e.preventDefault()
    console.log(this.state)
    console.log("DATE COMPARISON: ", this.state.date_from < this.state.date_to)
    createTrip(this.state)
    .then(res => {
      if (!res.id){
        console.log("DIDN'T happen")
        //alert("Name, location and country can't be blank")
        let p = document.querySelector('p')
        p.innerText = "Name, location, country and dates must be valid"
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
    if (this.state.date_from < date) {
      this.setState({ date_to: date})
    }else {
      console.log("DATE IS NOT VALID")
    }
  }

  toggleCalendar = () => {
    this.setState({ clicked: !this.state.clicked })
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
      <div className="form">
        <h3>NEW TRIP:</h3>
        <p></p>
        <form onSubmit={this.handleSubmit} >

          {/*
          EXAMPLE:
          // <label className="form-field" htmlFor="email">
          //   <span>E-mail:</span>
          //   <input name="email" type="email" onChange={handleChange} />
          // </label>
          // <div className="form-field-error">{errors.email}</div>
          */}

          <label className="form-field" htmlFor="trip name">
            <span>Trip name:</span>
            <input type="text" value={name} name="name"
              onChange={this.handleChange}
              placeholder="Birthday weekend"
            /> <br/>
          </label>

          <label className="form-field" htmlFor="location">
            <span>Location:</span>
            <input type="text" value={location} name="location"
              onChange={this.handleChange}
              placeholder="Amalfi Coast"
            /> <br/>
          </label>

          <label className="form-field" htmlFor="country">
            <span>Country:</span>
            <span class="country">
            <Select
              onChange={this.handleCountryOption}
              options={this.getCountriesObj()}
              placeholder='Select a country...'
              isSearchable={true}
            />
            </span>
          </label>

          <label className="form-field" htmlFor="things did">
            <span>Things did:</span>
            <input type="text" value={things_did} name="things_did"
              onChange={this.handleChange}
              placeholder="Swimming, tanning, hiking, road trips..."
            /> <br/>
          </label>

          <label className="form-field" htmlFor="notes">
            <span>Notes:</span>
            <input type="text" value={notes} name="notes"
              onChange={this.handleChange}
              placeholder="Met Jupiter and Salma from Wknd!"
            /> <br/>
          </label>

          {
            this.state.clicked ?
              <div>
                <h3>Date from - date to:</h3>

                <span class="calendar">
                  <Calendar
                    onChange={this.onFromDateChange}
                    value={this.state.date}
                  />
                </span>

                <span class="calendar">
                  <Calendar
                    onChange={this.onToDateChange}
                    value={this.state.date}
                  />
                </span>
              </div>
            : <button className="calendarBtn" onClick={this.toggleCalendar}>CALENDAR</button>
          }
        <br/><br/>

          <input type="submit" value="SUBMIT" class="btn btn-info submitBtn"/>
        </form>
        <button onClick={this.props.cancelNewForm} class="btn btn-light cancelBtn">cancel</button>
      </div>
    )
  }
}

export default NewTripForm
