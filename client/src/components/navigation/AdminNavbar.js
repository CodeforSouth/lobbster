import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function displayName(user) {
  return `${user.firstName} ${user.lastName}`;
}

class AdminNavbar extends Component {
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
      <nav className="navbar is-primary">
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
              <Link to="/user-account-management" className="navbar-item">User Account Management</Link>
              <Link to="/" className="navbar-item is-active">Dashboard</Link>
              <Link to="/" className="navbar-item" onClick={endSession}>Logout</Link>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

AdminNavbar.propTypes = {
  user: PropTypes.object.isRequired,
  endSession: PropTypes.func.isRequired
};

export default AdminNavbar;
