import React, { Component } from "react"
import "../css/Nav.css"

class NavBar extends Component {
  state = {
    showMenu: false
  }

  toggleMenu = e => {
    this.setState({
      showMenu: true
    }, () => document.addEventListener("click", this.closeMenu))
  }

  closeMenu = e => {
    if (this.dropdownMenu !== null && !this.dropdownMenu.contains(e.target)) {
      this.setState({
        showMenu: false
      }, () => document.removeEventListener("click", this.closeMenu))
    }
  }

  render() {
    return (
      <div>
        <h2 className="greeting">Hi {this.props.activeUser.username}!</h2>
        <button className="more" onClick={this.toggleMenu}>
          More
        </button>
        {
          this.state.showMenu ?
            <div className="menu" ref={el => (this.dropdownMenu = el)}>
              <button className="btn btn-light"> Menu item 1 </button>
              <button className="btn btn-light"> Menu item 2 </button>
              <button
                className="btn btn-danger logout"
                onClick={this.props.handleLogout}
              >
                {' '}Logout{' '}
              </button>
            </div>
          : null
        }
      </div>
    );
  }
}

export default NavBar
