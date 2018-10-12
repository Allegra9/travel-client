import React, { Component } from 'react'
import '../css/SignUpForm.css'

class SignUpForm extends Component {

  state = {
    fields: {},
    errors: {},
  }

  handleChange = (e) => {
    let fields = this.state.fields
    fields[e.target.name] = e.target.value
    this.setState({
      fields
    }, console.log(this.state.fields.username) )
  }

  handleSubmit = (e) => {
    e.preventDefault()
    console.log(this.state.fields)
    if (this.validateForm()) {
      let fields = {}
      fields['username'] = ''
      fields['email'] = ''
      fields['password'] = ''
      this.setState({ fields:fields })
      alert('Form submitted', this.state.fields)
    }
  }

  validateForm = () => {
    let fields = this.state.fields
    let errors = {}
    let formIsValid = true

    if (!fields['username']) {
      formIsValid = false
      errors['username'] = '*Please enter your username'
    }

    if (typeof fields['username'] !== 'undefined') {
      if (!fields['username'].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false
        errors['username'] = '*Please enter alphabet characters only'
      }
    }

    if (!fields['email']) {
      formIsValid = false
      errors['email'] = '*Please enter your email'
    }

    if (typeof fields['email'] !== 'undefined') {
      //regular expression for email validation
      let pattern = new RegExp(/^(('[\w-\s]+')|([\w-]+(?:\.[\w-]+)*)|('[\w-\s]+')([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
      if (!pattern.test(fields['email'])) {
        formIsValid = false
        errors['email'] = '*Please enter valid email'
      }
    }

    if (!fields['password']) {
      formIsValid = false
      errors['password'] = '*Please enter your password'
    }

    if (typeof fields['password'] !== 'undefined') {
      if (!fields['password'].match(/^.*(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,}).*$/)) {
        formIsValid = false
        errors['password'] = '*Please enter secure and strong password'
      }
    }

    this.setState({
      errors: errors
    })

    return formIsValid
  }

  render() {

    const { username, email, password } = this.state

    return (
      <div id='main-registration-container'>
        <div id='register'>
          <h3>Sign up</h3>
          <form onSubmit={this.handleSubmit} >
            <label>Username:
              <input type='text' name='username' value={username} onChange={this.handleChange} />
            </label>
            <div className='errorMsg'>{this.state.errors.username}</div>
            <label>Email:
              <input type='text' name='email' value={email} onChange={this.handleChange} />
            </label>
            <div className='errorMsg'>{this.state.errors.email}</div>
            <label>Password:
              <input type='password' name='password' value={password} onChange={this.handleChange} />
            </label>
            <div className='errorMsg'>{this.state.errors.password}</div>
            <input type='submit' className='button' value='Sign Up'/>
          </form>
        </div>
      </div>
    )
  }

}

export default SignUpForm
