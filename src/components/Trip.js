import React, { Component } from 'react';
import { getAllTrips } from '../adapter/api';

class Trip extends React.Component {

  state={
    trips: [],
  }

  componentDidMount() {
    getAllTrips()
      .then(trips => {
        this.setState({ trips })
      })
  }

  render() {

  const trips = this.state.trips.map(trip => {
    return <li>Trip: {trip.name} in {trip.location}, {trip.country}</li>
  })

    return (
      <div>
        Hello! My trips:
        <ul>
          {trips}
        </ul>
      </div>
    )
  }

}

export default Trip
