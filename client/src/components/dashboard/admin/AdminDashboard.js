import React from 'react';
import PropTypes from 'prop-types';

const AdminDashboard = ({ user }) => (
  <div className="hero-body has-background-white">
    <div>
      <div className="container has-text-left">
        <div className="column is-10 is-offset-1">
          <div className="container">
            <section />
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
