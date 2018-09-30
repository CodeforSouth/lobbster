import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function displayName(user) {
  return `${user.firstName} ${user.lastName}`;
}

class LobbyistNavbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      burgerIsActive: false
    };

    this.toggleBurger = this.toggleBurger.bind(this);
  }

  burgerClassList() {
    const { burgerIsActive } = this.state;
    const requiredClasses = 'navbar-burger burger';
    const activeClass = burgerIsActive ? 'is-active' : '';
    return [requiredClasses, activeClass].join(' ');
  }

  toggleBurger() {
    const { burgerIsActive } = this.state;
    this.setState({ burgerIsActive: !burgerIsActive });
  }

  render() {
    const { user, endSession } = this.props;
    return (
      <nav className="navbar">
        <div className="container">
          <div className="navbar-brand">
            <a className="navbar-item" href="/">
              {user && displayName(user)}
            </a>
            <span className={this.burgerClassList()} data-target="navMenu" onClick={this.toggleBurger}>
              <span />
              <span />
              <span />
            </span>
          </div>
          <div id="navMenu" className="navbar-menu">
            <div className="navbar-end">
              <Link to="/" className="navbar-item is-active">Dashboard</Link>
              <Link to="/" className="navbar-item" onClick={endSession}>Logout</Link>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

LobbyistNavbar.propTypes = {
  user: PropTypes.object.isRequired,
  endSession: PropTypes.func.isRequired
};

export default LobbyistNavbar;
