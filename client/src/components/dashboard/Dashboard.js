import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import AdminDashboard from './admin/AdminDashboard';
import LobbyistDashboard from './lobbyist/LobbyistDashboard';

const Dashboard = ({ user, userIsAuthenticated }) => {
  if (!userIsAuthenticated) {
    return <Redirect to="/" />;
  } else if (user.isAdmin) {
    return <AdminDashboard user={user} />;
  } else {
    return <LobbyistDashboard user={user} />;
  }
};

Dashboard.propTypes = {
  user: PropTypes.object,
  userIsAuthenticated: PropTypes.bool.isRequired
};
Dashboard.defaultProps = {
  user: null
};

export default Dashboard;
