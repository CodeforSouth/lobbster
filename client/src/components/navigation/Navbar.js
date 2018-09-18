import React, { Component } from 'react';
import PropTypes from 'prop-types';

import LandingNavbar from './LandingNavbar';
import LobbyistNavbar from './LobbyistNavbar';
import AdminNavbar from './AdminNavbar';

function selectNavbar(user, endSession) {
  if (user === null || Object.keys(user).length === 0) {
    return <LandingNavbar />;
  } else if (user.isAdmin) {
    return <AdminNavbar endSession={endSession} user={user} />;
  } else {
    return <LobbyistNavbar endSession={endSession} user={user} />;
  }
}

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    const { user, endSession } = this.props;
    return (
      <div>
        {selectNavbar(user, endSession)}
      </div>
    );
  }
}

Navbar.propTypes = {
  user: PropTypes.object,
  endSession: PropTypes.func.isRequired
};

Navbar.defaultProps = {
  user: null
};

export default Navbar;
