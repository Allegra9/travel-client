import React, { Component } from "react"
import "../css/Nav.css"
import Button from '@material-ui/core/Button';

class NavBar extends Component {
  state = {
    showMenu: false,
    open: false,
  }

  handleClick = () => {
    this.setState({
      open: !this.state.open
    })
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
      <div className="navbar">
        <h2 className="greeting">Hi {this.props.activeUser.username}!</h2>
        <span className="more" onClick={this.toggleMenu}>
          <div className="dot"></div>
        </span>
        <div className="logout">
          <Button variant="contained" color="primary">
            Logout
          </Button>
        </div>

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
