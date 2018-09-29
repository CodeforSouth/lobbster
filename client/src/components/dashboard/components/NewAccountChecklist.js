import React from 'react';
import PropTypes from 'prop-types';

import SetupStepTag from './SetupStepTag';

const EmailVerifiedTag = ({ emailVerified }) => (
  <SetupStepTag actionName="Email Verification" acheived={emailVerified} />
);
EmailVerifiedTag.propTypes = {
  emailVerified: PropTypes.bool.isRequired
};

const NewAccountChecklist = ({ user }) => (
  <div className="box">
    <h2>New Account Checklist</h2>
    <EmailVerifiedTag emailVerified={user.emailVerified} />
  </div>
);
NewAccountChecklist.propTypes = {
  user: PropTypes.object.isRequired
};

export default NewAccountChecklist;
