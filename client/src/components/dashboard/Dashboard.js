import React from 'react';
import PropTypes from 'prop-types';

import AdminDashboard from './admin/AdminDashboard';
import LobbyistDashboard from './lobbyist/LobbyistDashboard';

const Dashboard = ({ user }) => {
  let dashboard = null;
  if (user.isAdmin) {
    dashboard = <AdminDashboard user={user} />;
  } else {
    dashboard = <LobbyistDashboard user={user} />;
  }

  return (
    <div>
      {dashboard}
    </div>
  );
};

Dashboard.propTypes = {
  user: PropTypes.object.isRequired
};

export default Dashboard;
