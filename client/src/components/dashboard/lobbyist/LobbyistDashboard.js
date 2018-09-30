import React from 'react';
import PropTypes from 'prop-types';

import { noticeBar, verifyEmailNotice } from '../components/noticeBar';

const LobbyistDashboard = ({ user }) => (
  <div className="hero-body has-background-white">
    <div>
      <div className="container">
        <section>
          <h1 className="title is-2 has-text-black">
            Viewing reports for calendar year
            {' '}
            <select className="select is-large">
              <option>2018</option>
              <option>2017</option>
            </select>
          </h1>
        </section>
      </div>
      <div className="container">
        <section>
          { !user.emailVerified && noticeBar([verifyEmailNotice()]) }
        </section>
      </div>
      <div className="container">
        <section>
          <p className="has-text-primary">
            You are a Lobbyist!
          </p>
        </section>
      </div>
    </div>
  </div>
);

LobbyistDashboard.propTypes = {
  user: PropTypes.object.isRequired
};

export default LobbyistDashboard;
