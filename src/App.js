import React, { Component, Fragment } from 'react'
import NavBar from './components/NavBar'
import Trips from './components/Trips.js'
import SignUpForm from './components/SignUpForm'
import LoginForm from './components/LoginForm'
import { getCurrentUser } from './adapter/api'

class App extends Component {

  state = {
    activeUser : '',
    signup: false
  }

  toggleSignUp = (e) => {
    e.preventDefault()
    this.setState({
      signup: !this.state.signup
    })
  }

  handleLogin = (res) => {
    console.log("HANDLE LOGIN IN APP", res)
    localStorage.setItem('token', res.token)
      this.updateCurrentUser(res.token);
  }

  componentDidMount() {
    if(localStorage.getItem('token')) {
      this.updateCurrentUser();
    }
  }

  updateCurrentUser = () => {
    console.log("Attempting to fetch current user...");
    getCurrentUser(localStorage.getItem('token'))
    .then(res => {
      if(res.error) {
        this.handleLogout()
      } else {
        this.setState({
          activeUser: res
        })
      }
    })
  }

  handleLogout = () => {
    this.setState({
      activeUser: ''
    })
    localStorage.clear()
  }

  render() {
    return (
      <div>
        {
          this.state.activeUser ?

          <Fragment>
            <NavBar
              activeUser={this.state.activeUser}
              handleLogout={this.handleLogout}
            />
            <Trips activeUser={this.state.activeUser} />
          </Fragment>
        :
          <Fragment>
          {
            this.state.signup
            ?
              <SignUpForm
                handleLogin={this.handleLogin}
                toggleSignUp={this.toggleSignUp}
              />
            :
              <LoginForm
                handleLogin={this.handleLogin}
                toggleSignUp={this.toggleSignUp}
              />
          }
          </Fragment>
        }
      </div>
    )
  }
}

export default App;
