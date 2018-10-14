import React from 'react'

const NavBar = (props) => {

  return (
    <div>
      <h2>
        Hi {props.activeUser.username}!
      </h2>
      <button onClick={props.handleLogout}>
        Logout
      </button>
    </div>
  )
}

export default NavBar
