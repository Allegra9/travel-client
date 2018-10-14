import React, { Component } from 'react'
//import logo from './logo.svg'
//import './App.css'
import Trips from './components/Trips.js'
import SignUpForm from './components/SignUpForm'
import LoginForm from './components/LoginForm'

class App extends Component {

  render() {
    return (
      <div>
        <Trips />
        <SignUpForm />
        <LoginForm />
      </div>
    )
  }
}

export default App;
