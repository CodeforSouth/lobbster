import React from 'react';
import PropTypes from 'prop-types';

import { noticeBar, verifyEmailNotice } from '../components/noticeBar';

const AdminDashboard = ({ user }) => (
  <div className="hero-body has-background-white">
    <div>
      <div className="container has-text-left">
        <div className="column is-10 is-offset-1">
          <div className="container">
            <section>
              { !user.emailVerified && noticeBar([verifyEmailNotice(1)]) }
            </section>
          </div>
        </div>
      </div>
    </div>
  </div>
);

AdminDashboard.propTypes = {
  user: PropTypes.object.isRequired
};

export default AdminDashboard;
