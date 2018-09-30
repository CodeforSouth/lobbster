import React from 'react';

export default function requestMonitor(errorMessage, requestFailed) {
  const message = requestFailed ? errorMessage : '';
  const style = requestFailed ? { paddingTop: '1rem' } : { paddingTop: '0rem' };
  return (
    <p className="has-text-grey" style={style}>
      { message }
    </p>
  );
}
