import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import AuthForm from './authForm/AuthForm';

function Landing({ updateCurrentUser, userIsAuthenticated }) {
  if (userIsAuthenticated) {
    return <Redirect to="/dashboard" />;
  } else {
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
}

Landing.propTypes = {
  updateCurrentUser: PropTypes.func.isRequired,
  userIsAuthenticated: PropTypes.bool.isRequired
};

export default Landing;
