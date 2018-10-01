import React from 'react';
import PropTypes from 'prop-types';

import { noticeBar, verifyEmailNotice } from '../components/noticeBar';
import ReportsOverview from '../components/ReportsOverview';

const LobbyistDashboard = ({ user }) => (
  <div className="hero-body has-background-white">
    <div>
      <div className="container">
        <section>
          { !user.emailVerified && noticeBar([verifyEmailNotice(1)]) }
        </section>
      </div>
      <div className="container">
        <section>
          <p className="has-text-primary">
            You are a Lobbyist!
          </p>
        </section>
      </div>
      <div className="container">
        <section>
          <ReportsOverview year={2018} />
        </section>
      </div>
    </div>
  </div>
);

LobbyistDashboard.propTypes = {
  user: PropTypes.object.isRequired
};

export default LobbyistDashboard;
