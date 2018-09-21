import React, { Component } from 'react';
//import logo from './logo.svg';
//import './App.css';
import Trip from './components/Trip'

class App extends Component {
  render() {
    return (
      <div>
        Hello
        <Trip />  // why the fuck this doesn't work
      </div>
    )
  }
}

export default App;
