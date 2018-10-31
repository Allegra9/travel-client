import React, { Component } from 'react'
import { createTrip } from '../adapter/api'
import worldCountries from 'world-countries'
import Select from 'react-select'
import Calendar from 'react-calendar'
import '../css/Form.css'
import Dropzone from 'react-dropzone';

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

    files: [],
  }

  handleSubmit = (e) => {
    e.preventDefault()
    if (this.validateForm()) {
      console.log(this.state)
      console.log("DATE COMPARISON: ", this.state.date_from < this.state.date_to)
      createTrip(this.props.activeUserId, this.state)
      .then(res => {
        if(res.error) {
          let errors = {}
          console.log("Response", res)
          console.log("Res ERR:", res.error)
          errors['server'] = res.error
          this.setState({
            errors: errors
          })
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

  onDrop = (files) => {
    console.log(files[0])  //lastModifiedDate, name, type: "image/png", size
    files.forEach(file => {
      const reader = new FileReader();

      let fileToUpload = {
        data: '',
        name: file.name,
        type: file.type,
        size: file.size
      }
      reader.onload = () => {
        const fileAsBinaryString = reader.result;
        fileToUpload.data = 'data:image/jpeg;base64,' + btoa(fileAsBinaryString)
        console.log(fileToUpload)
        this.setState({ files: [...this.state.files, fileToUpload] })
      }
      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');

      reader.readAsBinaryString(file);
    })
  }

  onCancel = () => {
    this.setState({ files: [] })
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
      things_did,
      notes,
    } = this.state

    return (
      <div className="form">
        <h3>NEW TRIP:</h3>
        <form onSubmit={this.handleSubmit} >

          <label className="form-field" htmlFor="trip name">
            <span>Trip name:*</span>
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
            <span>Location:*</span>
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
            <span>Country:*</span>
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
                <h3>Date from - date to:*</h3>

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

          <section>
            <div className=''>
              <Dropzone
                onDrop={this.onDrop}
                onCancel={this.onCancel}
                className="add-file"
              >
                <p>Try dropping some files here, or click to select files to upload.</p>
              </Dropzone>
            </div>
            <aside>
              <h2>Dropped files</h2>
              <ul>
                {
                  this.state.files.map(file =>
                    <li key={Math.random()}><img src={file.data}></img>{file.name} - {file.size} bytes</li>
                  )
                }
              </ul>
            </aside>
          </section>

          <input type="submit" value="SUBMIT" className="btn btn-info submitBtn"/>
          <div className='errorMsg'>{this.state.errors.server}</div>
        </form>
        <button onClick={this.props.cancelNewForm} className="btn btn-light cancelBtn">cancel</button>
      </div>
    )
  }
}

export default NewTripForm
