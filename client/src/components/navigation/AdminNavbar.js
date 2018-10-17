import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class AdminNavbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      burgerIsActive: false
    };

    this.toggleBurger = this.toggleBurger.bind(this);
  }

  burgerDependentClasses() {
    const { burgerIsActive } = this.state;
    const requiredClasses = 'navbar-menu';
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
        <div className="navbar-brand">
          <a className="navbar-item" href="/">
            {user && user.fullName}
          </a>
          <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navMenu" onClick={this.toggleBurger}>
            <span areahidden="true" />
            <span areahidden="true" />
            <span areahidden="true" />
            <span areahidden="true" />
          </a>
        </div>
        <div id="navMenu" className={this.burgerDependentClasses()}>
          <div className="navbar-end">
            <Link to="/user-account-management" className="navbar-item">User Account Management</Link>
            <Link to="/explore" className="navbar-item">Explore Reports</Link>
            <Link to="/" className="navbar-item is-active">Dashboard</Link>
            <Link to="/" className="navbar-item" onClick={endSession}>Logout</Link>
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
