import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function emailField(emailAddress, fieldName, onChange) {
  return (
    <div className="field">
      <p className="control has-icons-left">
        <input required className="input" type="email" placeholder="Email" name={fieldName} value={emailAddress} onChange={onChange} />
        <span className="icon is-small is-left">
          <FontAwesomeIcon icon="envelope" />
        </span>
      </p>
    </div>
  );
}

export function passwordField(password, fieldName, onChange) {
  return (
    <div className="field">
      <div className="control has-icons-left">
        <input required className="input" type="password" placeholder="Password" name={fieldName} value={password} onChange={onChange} />
        <span className="icon is-small is-left">
          <FontAwesomeIcon icon="lock" />
        </span>
      </div>
    </div>
  );
}
