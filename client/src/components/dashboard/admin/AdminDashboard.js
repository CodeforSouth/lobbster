import React from 'react';
import PropTypes from 'prop-types';

import NewAccountChecklist from '../components/NewAccountChecklist';

const AdminDashboard = ({ user }) => (
  <div className="hero-body has-background-white-ter">
    <section>
      <p className="has-text-primary">
        You are an admin!
      </p>
    </section>
    <section>
      <NewAccountChecklist user={user} />
    </section>
  </div>
);

AdminDashboard.propTypes = {
  user: PropTypes.object.isRequired
};

export default AdminDashboard;
