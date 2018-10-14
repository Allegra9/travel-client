import React, { Component } from 'react'
import { createTrip } from '../adapter/api'
import worldCountries from 'world-countries'
import Select from 'react-select'
import Calendar from 'react-calendar'
import '../css/Form.css'

class NewTripForm extends Component{

  state={
    user_id: '',
    name: '',
    location: '',
    country: '',
    things_did: '',
    notes: '',
    date_from: '',
    date_to: '',

    errors: {},
    clicked: false,
  }

  handleSubmit = (e) => {
    e.preventDefault()
    if (this.validateForm()) {
      console.log(this.state)
      console.log("DATE COMPARISON: ", this.state.date_from < this.state.date_to)
      createTrip(this.props.activeUserId, this.state)
      .then(res => {
        if (!res.id){
          console.log("DIDN'T happen server side")
          //alert("Name, location and country can't be blank")
          // let p = document.querySelector('p')
          // p.innerText = "Name, location, country and dates must be valid"
          // p.style.color = 'red'
          // let form = document.querySelector('form')
          // form.prepend(p)
          // return
        }else {
          this.setState({
              name: '',
              location: '',
              country: '',
              things_did: '',
              notes: '',
              date_from: '',
              date_to: '',
          }, () => this.props.addTrip() )
        }
      })
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  componentDidMount() {
    console.log("NewtripForm, activeUserId: ", this.props.activeUserId)
    this.setState({
      user_id: this.props.activeUserId
    })
  }

  toggleCalendar = () => {
    this.setState({ clicked: !this.state.clicked })
  }

  onFromDateChange = (date) => {     //object to string
    date = JSON.stringify(date).slice(1,11) // 2018-10-24
    this.setState({ date_from: date })
  }

  onToDateChange = (date) => {
    date = JSON.stringify(date).slice(1,11)
    if (this.state.date_from <= date) {
      this.setState({ date_to: date})
    }else {
      alert("*Dates must be valid!")
    }
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

  validateForm = () => {
    let errors = {}
    let formIsValid = true

    if (!this.state.name) {
      formIsValid = false
      errors['name'] = '*Please enter a trip name'
    }

    if (!this.state.location) {
      formIsValid = false
      errors['location'] = '*Please enter a trip location'
    }

    if (!this.state.country) {
      formIsValid = false
      errors['country'] = '*Please select a country'
    }

    if (!this.state.date_from && !this.state.date_to) {
      formIsValid = false
      errors['openCalendar'] = '*Click on Calendar to select trip dates'
    }

    if (!this.state.date_from || !this.state.date_to) {
      formIsValid = false
      errors['selectDates'] = '*Please select trip dates'
    }

    this.setState({
      errors: errors
    })

    return formIsValid
  }

  render() {

    const {
      name,
      location,
      things_did,
      notes,
    } = this.state

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
            <input
              type="text"
              value={name}
              name="name"
              onChange={this.handleChange}
              placeholder="Birthday weekend"
            />
          </label>
          <div className='errorMsg'>{this.state.errors.name}</div>

          <label className="form-field" htmlFor="location">
            <span>Location:</span>
            <input
              type="text"
              value={location}
              name="location"
              onChange={this.handleChange}
              placeholder="Amalfi Coast"
            />
          </label>
          <div className='errorMsg'>{this.state.errors.location}</div>

          <label className="form-field" htmlFor="country">
            <span>Country:</span>
            <span className="country">
            <Select
              onChange={this.handleCountryOption}
              options={this.getCountriesObj()}
              placeholder='Select a country...'
              isSearchable={true}
            />
            </span>
          </label>
          <div className='errorMsg'>{this.state.errors.country}</div>

          <label className="form-field" htmlFor="things did">
            <span>Things did:</span>
            <input
              type="text"
              value={things_did}
              name="things_did"
              onChange={this.handleChange}
              placeholder="Swimming, tanning, hiking, road trips..."
            />
          </label>

          <label className="form-field" htmlFor="notes">
            <span>Notes:</span>
            <input
              type="text"
              value={notes}
              name="notes"
              onChange={this.handleChange}
              placeholder="Met Jupiter and Salma from Wknd!"
            />
          </label>

          {
            this.state.clicked ?
              <div>
                <h3>Date from - date to:</h3>

                <span className="calendar">
                  <Calendar
                    onChange={this.onFromDateChange}
                    value={this.state.date}
                  />
                </span>

                <span className="calendar">
                  <Calendar
                    onChange={this.onToDateChange}
                    value={this.state.date}
                  />
                </span>
                <div className='errorMsg'>{this.state.errors.selectDates}</div>
              </div>
            :
              <div>
                <button className="calendarBtn" onClick={this.toggleCalendar}>CALENDAR</button>
                <div className='errorMsg'>{this.state.errors.openCalendar}</div>
              </div>
          }
          <input type="submit" value="SUBMIT" className="btn btn-info submitBtn"/>
        </form>
        <button onClick={this.props.cancelNewForm} className="btn btn-light cancelBtn">cancel</button>
      </div>
    )
  }
}

export default NewTripForm
