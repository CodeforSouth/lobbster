import React from 'react';
import PropTypes from 'prop-types';

import NewAccountChecklist from '../components/NewAccountChecklist';

const LobbyistDashboard = ({ user }) => (
  <div className="hero-body">
    <section>
      <NewAccountChecklist user={user} />
    </section>
  </div>
);

LobbyistDashboard.propTypes = {
  user: PropTypes.object.isRequired
};

export default LobbyistDashboard;
