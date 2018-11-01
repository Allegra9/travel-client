import React, { Component } from 'react';
import { editTrip } from '../adapter/api';
import worldCountries from 'world-countries'
import Select from 'react-select'
import Calendar from 'react-calendar'
import '../css/Form.css'

class EditTrip extends Component{

  state={
    user_id: '',
    name: '',
    location: '',
    country: '',
    things_did: '',
    notes: '',
    date_from: '',
    date_to: '',
    id: '',
    files: [],

    errors: {},
    clicked: false,
  }

  handleSubmit = (e) => {
    e.preventDefault()
    if (this.validateForm()) {
      console.log(this.state)
      console.log("DATE COMPARISON: ", this.state.date_from < this.state.date_to)
      //createTrip(this.props.activeUserId, this.state)
      editTrip(this.state)   //PUT
      .then(res => {
        if (res.error){
          let errors = {}
          console.log("Response", res)
          console.log("Res ERR:", res.error)
          errors['server'] = res.error
          this.setState({
            errors: errors
          })
        } else {
          console.log("RES in EditForm: ", res)
          this.props.showTrip(res)
          this.props.cancelEdit()
        }
      })
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  deleteImage = (img) => {
    console.log(img)
    this.setState({
      files: this.state.files.filter(image => image !== img)
    })
  }

  componentDidMount() {
    this.getTrip(this.props.trip)
  }

  getTrip = (trip) => {
    console.log("in get trip: ", trip)
    this.setState({
      id: trip.id,
      user_id: trip.user_id,
      name: trip.name,
      location: trip.location,
      country: trip.country,
      things_did: trip.things_did,
      notes: trip.notes,
      date_from: trip.date_from,
      date_to: trip.date_to,
      files: this.makeImgObj(trip.image_data, trip.image_name, trip.image_type, trip.image_size)
    })
  }

  makeImgObj = (image_data, image_name, image_type, image_size) => {
    let images = []
    for(let i = 0; i < JSON.parse(image_name).length; i++) {
      let img = {}
      img['data'] = JSON.parse(image_data)[i]
      img['name'] = JSON.parse(image_name)[i]
      img['type'] = JSON.parse(image_type)[i]
      img['size'] = JSON.parse(image_size)[i]
      images = [...images, img]
    }
    console.log(images)
    return images
  }

  toggleCalendar = () => {
    this.setState({ clicked: !this.state.clicked })
  }

  onFromDateChange = (date) => {     //object to string
    console.log("date from: ", date)
    this.setState({ date_from: date })
  }

  onToDateChange = (date) => {
    //console.log("date to: ", date)
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
      country,
      things_did,
      notes,
      date_from,
      date_to,
      files
    } = this.state

    return (
      <div className="form">
        <h3>EDIT TRIP:</h3>
        <form onSubmit={this.handleSubmit} >

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
              placeholder={country}
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
                    value={new Date(date_from)}
                  />
                </span>

                <span className="calendar">
                  <Calendar
                    onChange={this.onToDateChange}
                    value={new Date(date_to)}
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

          {
            files.map(img =>
              <li key={Math.random()}>
                <img src={img.data} alt={img.name}></img>
                <p>{img.name}</p>
                <p>{img.type} - {img.size}</p>
                <button onClick={() => this.deleteImage(img)}>x</button>
              </li>
            )
          }

          <input type="submit" value="UPDATE" className="btn btn-info submitBtn"/>
          <div className='errorMsg'>{this.state.errors.server}</div>
        </form>
        <button onClick={this.props.cancelEdit} className="btn btn-light cancelBtn">cancel</button>
      </div>
    )
  }
}

export default EditTrip
