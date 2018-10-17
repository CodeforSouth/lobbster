import React from 'react';
import PropTypes from 'prop-types';

import { noticeBar, verifyEmailNotice } from '../components/noticeBar';
import DisclosuresOverview from '../components/DisclosuresOverview';
import discloseNewPrincipalButton from '../components/discloseNewPrincipalButton';

const LobbyistDashboard = ({ user }) => (
  <div className="hero-body has-background-white">
    <div className="container has-text-left">
      <div className="column is-10 is-offset-1">
        <div className="container">
          { !user.emailVerified && noticeBar([verifyEmailNotice(1)]) }
        </div>
        <div className="container">
          <DisclosuresOverview
            lobbyistId={user.id}
            selectedYear={2018}
            yearOptions={[2018, 2017]}
            includeLobbyistName={false}
            linkToDisclosure={true}
          />
        </div>
        <div className="container">
          { discloseNewPrincipalButton() }
        </div>
      </div>
    </div>
  </div>
);

LobbyistDashboard.propTypes = {
  user: PropTypes.object.isRequired
};

export default LobbyistDashboard;
