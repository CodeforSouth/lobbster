import React, { Component } from 'react';

class LandingNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    return (
      <nav className="navbar is-primary">
        <div className="container">
          <div className="navbar-brand">
            <a className="navbar-item" href="/">
              <h1 className="is-size-3 has-text-weight-semibold">Lobbster</h1>
            </a>
          </div>
        </div>
      </nav>
    );
  }
}

export default LandingNavbar;
