import React from 'react';
import PropTypes from 'prop-types';

import SetupStepTag from './SetupStepTag';

const EmailVerifiedTag = ({ emailVerified }) => (
  <SetupStepTag actionName="Email Verification" acheived={emailVerified} />
);
EmailVerifiedTag.propTypes = {
  emailVerified: PropTypes.bool.isRequired
};

const IdentityVerifiedTag = ({ identityVerified }) => (
  <SetupStepTag actionName="Identity Verification" acheived={identityVerified} />
);
IdentityVerifiedTag.propTypes = {
  identityVerified: PropTypes.bool.isRequired
};

const NewAccountChecklist = ({ user }) => (
  <div className="box">
    <h2>New Account Checklist</h2>
    <EmailVerifiedTag emailVerified={user.emailVerified} />
    {!user.isAdmin && <IdentityVerifiedTag identityVerified={user.identityVerified} />}
  </div>
);
NewAccountChecklist.propTypes = {
  user: PropTypes.object.isRequired
};

export default NewAccountChecklist;
