import React, { Component } from 'react'
import '../css/SignUpForm.css'
import { loginUser } from '../adapter/api'

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
      loginUser(this.state)
      .then(res => {
        if(res.error) {
          let errors = {}
          console.log("Response", res)
          console.log("Res ERR:", res.error)
          if (res.error){
            errors['email'] = '*The email and password that you entered did not match our records. Please double-check and try again.'
          }
          this.setState({
            errors: errors
          })
        }else {
          console.log("USER SUCCESSFULLY LOGGED IN")
          console.log("Response", res)  // is a token
          this.props.handleLogin(res)
        }
      })
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

    const { email, password } = this.state

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
        <p> Dont have an account? <a href='' onClick={this.props.toggleSignUp}> Sign up here</a></p>
      </div>
    )
  }

}

export default LoginForm
