import React from 'react';

export default function authButton(label, requestPending) {
  const fixedClasses = 'button is-block is-info is-fullwidth';
  const loginStatusClass = requestPending ? 'is-loading' : '';
  const classes = [fixedClasses, loginStatusClass].join(' ');
  return (
    <button type="submit" className={classes}>
      { label }
    </button>
  );
}
