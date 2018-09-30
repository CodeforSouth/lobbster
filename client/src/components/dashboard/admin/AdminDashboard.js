import React from 'react';
import PropTypes from 'prop-types';

import { noticeBar, verifyEmailNotice } from '../components/noticeBar';

const AdminDashboard = ({ user }) => (
  <div className="hero-body has-background-white">
    <div>
      <div className="container">
        <section>
          { !user.emailVerified && noticeBar([verifyEmailNotice()]) }
        </section>
      </div>
      <div className="container">
        <section>
          <p className="has-text-primary">
            You are an admin!
          </p>
        </section>
      </div>
    </div>
  </div>
);

AdminDashboard.propTypes = {
  user: PropTypes.object.isRequired
};

export default AdminDashboard;
