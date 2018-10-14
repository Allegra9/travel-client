import React, { Component } from 'react'
import '../css/SignUpForm.css'
//import { createUser } from '../adapter/api'

class LoginForm extends Component {

  state = {
    email: '',
    password: '',
    errors: {},
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    if (this.validateForm()) {
      console.log(this.state)
      // createUser(this.state)
      // .then(res => {
      //   if(res.error) {
      //     let errors = {}
      //     console.log("Response", res)
      //     console.log("Res ERR:", res.error)
      //     if (res.error === "*Username already exists"){
      //       errors['username'] = res.error
      //     }else {
      //       errors['email'] = res.error
      //     }
      //     this.setState({
      //       errors: errors
      //     })
      //   }else {
      //     console.log("USER SUCCESSFULLY LOGGED IN")
      //     //this.props.handleLogin(res)
      //   }
      // })
    }
  }

  validateForm = () => {
    let errors = {}
    let formIsValid = true

    if (!this.state.email) {
      formIsValid = false
      errors['email'] = '*Please enter your email'
    }

    if (this.state.email) {
      //regular expression for email validation
      let pattern = new RegExp(/^(('[\w-\s]+')|([\w-]+(?:\.[\w-]+)*)|('[\w-\s]+')([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
      if (!pattern.test(this.state.email)) {
        formIsValid = false
        errors['email'] = '*Please enter a valid email address'
      }
    }

    if (!this.state.password) {
      formIsValid = false
      errors['password'] = '*Please enter your password'
    }

    this.setState({
      errors: errors
    })

    return formIsValid
  }

  render() {

    const { username, email, password } = this.state

    return (
      <div id='login'>
        <h3>Login</h3>
        <form onSubmit={this.handleSubmit} >
          <label>Email:
            <input
              className="input"
              type='email'
              name='email'
              value={email}
              onChange={this.handleChange}
            />
          </label>
          <div className='errorMsg'>{this.state.errors.email}</div>

          <label>Password:
            <input
              className="input"
              type='password'
              name='password'
              value={password}
              onChange={this.handleChange}
            />
          </label>
          <div className='errorMsg'>{this.state.errors.password}</div>
          <input type='submit' className='button' value='Login'/>
        </form>
      </div>
    )
  }

}

export default LoginForm
