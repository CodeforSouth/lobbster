import React from 'react';

export default function requestMonitor(errorMessage, requestFailed) {
  const message = requestFailed ? errorMessage : '';
  return (
    <p className="has-text-grey">
      { message }
    </p>
  );
}
