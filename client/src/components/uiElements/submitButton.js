import React from 'react';

export const requestStates = {
  initial: 1,
  submitted: 2,
  succeeded: 3,
  failed: 4
};

export function submitButton(label, requestState) {
  const fixedClasses = 'button is-primary';
  const requestStatusClass = requestState === requestStates.submitted ? 'is-loading' : '';
  const classes = [fixedClasses, requestStatusClass].join(' ');
  return (
    <div>
      <button type="submit" className={classes}>{label}</button>
      {requestState === requestStates.failed && <p className="has-text-danger">Error</p>}
      {requestState === requestStates.succeeded && <p className="has-text-success">Success</p>}
    </div>
  );
}
