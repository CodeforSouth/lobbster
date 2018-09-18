import React from 'react';
import PropTypes from 'prop-types';

import AuthForm from './authForm/AuthForm';

function Landing({ updateCurrentUser }) {
  return (
    <div className="hero-body">
      <div className="container has-text-centered">
        <div className="column is-4 is-offset-4">
          <AuthForm updateCurrentUser={updateCurrentUser} />
        </div>
      </div>
    </div>
  );
}

Landing.propTypes = {
  updateCurrentUser: PropTypes.func.isRequired
};

export default Landing;
